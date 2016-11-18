import groupEvents from './groupEvents';
import parseCalendar from './parseCalendar';
import writeToCsv from './writeToCsv';

export default function createReport({ filepath, calendarUrl, dateFrom, dateTo }) {
  return fetchCalendar(calendarUrl)
    .then(
      iCalendarData => {
        const events = parseCalendar({ iCalendarData, dateFrom, dateTo });
        const groupedEvents = groupEvents(events);
        return writeToCsv(filepath, groupedEvents);
      }
    );
}

function fetchCalendar(url) {
  return fetch(url).then(response => response.text());
}
