import { ipcRenderer } from 'electron';
import getUserHome from './../../shared/configuration';

export default function createReport({ calendarUrl, dateFrom, dateTo }) {
  return new Promise((resolve, reject) => {
    getReportFilePath()
      .then(
        filepath => ipcRenderer.send('create-report-start', {
          filepath,
          calendarUrl,
          dateFrom,
          dateTo
        })
      )
      .catch(error => {
        reject(error);
      });

    ipcRenderer.on('create-report-response', (event, response) => {
      if (response.success) {
        resolve(response.msg);
      } else {
        reject(response.msg);
      }
    });
  });
}

function getReportFilePath() {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('show-save-dialog', { defaultPath: `${getUserHome()}/report.xls` });
    ipcRenderer.on('save-dialog-closed', (event, path) => {
      if (path) {
        resolve(path);
      } else {
        reject('File not selected');
      }
    });
  });
}
