import { app, BrowserWindow, Menu, dialog, ipcMain } from 'electron';

let mainWindow = null;
let backgroundWindow = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) { // eslint-disable-line
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};

app.on('ready', async () => {
  await installExtensions();

  mainWindow = new BrowserWindow({
    icon: `${__dirname}/icon.png`,
    show: false,
    width: 600,
    height: 500
  });

  mainWindow.loadURL(`file://${__dirname}/gui/index.html`);

  backgroundWindow = new BrowserWindow({
    title: 'Background',
    show: process.env.NODE_ENV === 'development'
  });

  backgroundWindow.loadURL(`file://${__dirname}/background/index.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    backgroundWindow.close();
  });

  backgroundWindow.on('closed', () => {
    backgroundWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();

    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(x, y);
        }
      }]).popup(mainWindow);
    });
  }
});

ipcMain.on('show-save-dialog', (event, payload) => {
  dialog.showSaveDialog(
    mainWindow,
    {
      defaultPath: payload.defaultPath
    },
    (path) => {
      mainWindow.webContents.send('save-dialog-closed', path);
    }
  );
});

ipcMain.on('create-report-start', (event, payload) => {
  backgroundWindow.webContents.send('create-report-start', payload);
});

ipcMain.on('create-report-response', (event, payload) => {
  mainWindow.webContents.send('create-report-response', payload);
});
