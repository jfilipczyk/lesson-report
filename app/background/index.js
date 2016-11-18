import { ipcRenderer } from 'electron';
import createReport from './services/createReport';

ipcRenderer.on('create-report-start', (event, payload) => {
  createReport(payload)
    .then(msg => ipcRenderer.send('create-report-response', { success: true, msg }))
    .catch(error => ipcRenderer.send('create-report-response', { success: false, msg: error.toString() }));
});
