import json2csv from 'json2csv';
import * as fs from 'fs';

export default function writeToCsv(filepath, groupedEvents) {
  return writeToFile(filepath, createCsv(groupedEvents));
}

function writeToFile(filepath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, 'utf8', (error) => {
      if (error) {
        reject(error);
      }
      resolve('File saved');
    });
  });
}

function createCsv(groupedEvents) {
  const fields = [
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Num of events',
      value: 'numOfEvents'
    },
    {
      label: 'Total time [hours]',
      value: row => {
        const totalInHours = row.totalTime / 3600;
        return Math.round(totalInHours * 10) / 10;
      }
    }
  ];
  return json2csv({ data: groupedEvents, fields });
}
