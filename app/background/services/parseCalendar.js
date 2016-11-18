import moment from 'moment';
import ICAL from 'ical.js';

export default function parseCalendar({ iCalendarData, dateFrom, dateTo }) {
  const mDateFrom = moment(dateFrom).startOf('day');
  const mDateTo = moment(dateTo).endOf('day');

  return getEvents(iCalendarData).reduce(
    (results, event) => results.concat(parseEvent(event, mDateFrom, mDateTo)),
    []
  );
}

function getEvents(iCalendarData) {
  const jcalData = ICAL.parse(iCalendarData);
  const vcalendar = new ICAL.Component(jcalData);
  const vevents = vcalendar.getAllSubcomponents('vevent');
  return vevents.map(vevent => new ICAL.Event(vevent));
}

function parseEvent(event, dateFrom, dateTo) {
  if (event.isRecurring()) {
    return parseRecurringEvent(event, dateFrom, dateTo);
  }
  return parseOneTimeEvent(event, dateFrom, dateTo);
}

function parseRecurringEvent(event, dateFrom, dateTo) {
  const results = [];
  const exDates = parseExDates(event);
  const iterator = getOccurenceIterator(event, dateFrom);
  let occurence;
  let start;
  let end;

  while ((occurence = iterator.next())) {
    ({ start, end } = calculateOccurenceFrame(event, occurence));

    if (!isInDateRange(start, end, dateFrom, dateTo)) {
      break;
    }

    if (!isException(start, exDates)) {
      results.push({
        summary: event.summary,
        start: start.toDate(),
        end: end.toDate()
      });
    }
  }

  return results;
}

function calculateOccurenceFrame(event, occurence) {
  const mOccurence = moment(occurence.toJSDate());
  const eventStartDate = moment(event.startDate.toJSDate());
  const offset = mOccurence.diff(eventStartDate.clone().startOf('day'), 'days');
  const start = eventStartDate.add(offset, 'days');
  const end = start.clone().add(event.duration.toSeconds(), 'seconds');

  return { start, end };
}

function parseExDates(event) {
  return event.component
    .getAllProperties('exdate')
    .map(prop => moment(prop.getValues().toString()));
}

function getOccurenceIterator(event, dateFrom) {
  return event.iterator(ICAL.Time.fromJSDate(dateFrom.toDate()));
}

function isInDateRange(start, end, dateRangeFrom, dateRangeTo) {
  return dateRangeFrom.diff(start, 'seconds') <= 0 && dateRangeTo.diff(end, 'seconds') >= 0;
}

function isException(start, exDates) {
  return exDates
    .filter(exDate => exDate.diff(start, 'seconds') === 0)
    .length > 0;
}

function parseOneTimeEvent(event, dateFrom, dateTo) {
  const start = moment(event.startDate.toJSDate());
  const end = moment(event.endDate.toJSDate());

  if (isInDateRange(start, end, dateFrom, dateTo)) {
    return [{
      summary: event.summary,
      start: start.toDate(),
      end: end.toDate()
    }];
  }
  return [];
}
