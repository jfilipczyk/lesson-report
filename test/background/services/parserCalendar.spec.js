/* eslint-disable func-names */
import { expect } from 'chai';
import * as fs from 'fs';
import parseCalendar from './../../../app/background/services/parseCalendar';

describe('Parser service', () => {
  it('returns array of events', () => {
    const events = parseFixture('no_recurrence.ics', '2016-11-01', '2016-11-30');

    expect(events).to.be.instanceof(Array).and.to.have.length(2);

    expect(events).to.include(event(
      'Event A',
      '2016-11-07 19:30:00',
      '2016-11-07 20:30:00'
    ));
    expect(events).to.include(event(
      'Event B',
      '2016-11-08 12:00:00',
      '2016-11-08 13:00:00'
    ));
  });

  it('returns events only for given date range', () => {
    const events = parseFixture('no_recurrence.ics', '2016-11-01', '2016-11-07');

    expect(events).to.be.instanceof(Array).and.to.have.length(1);
    expect(events.pop()).to.have.property('summary', 'Event A');
  });

  describe('when events are recurring', () => {
    it('returns event for each occurence in given date range', () => {
      const events = parseFixture('with_recurrence.ics', '2016-11-01', '2016-11-30');

      expect(events).to.be.instanceof(Array).and.to.have.length(4);

      expect(events).to.include(event(
        'Event A',
        '2016-11-07 19:30:00',
        '2016-11-07 20:30:00'
      ));
      expect(events).to.include(event(
        'Event A',
        '2016-11-14 19:30:00',
        '2016-11-14 20:30:00'
      ));
      expect(events).to.include(event(
        'Event A',
        '2016-11-21 19:30:00',
        '2016-11-21 20:30:00'
      ));
      expect(events).to.include(event(
        'Event A',
        '2016-11-28 19:30:00',
        '2016-11-28 20:30:00'
      ));
    });

    it('skips occurence exceptions', () => {
      const events = parseFixture('with_reccurence_and_exceptions.ics', '2016-11-01', '2016-11-30');

      expect(events).to.be.instanceof(Array).and.to.have.length(2);

      expect(events).to.include(event(
        'Event A',
        '2016-11-07 19:30:00',
        '2016-11-07 20:30:00'
      ));
      expect(events).to.include(event(
        'Event A',
        '2016-11-21 19:30:00',
        '2016-11-21 20:30:00'
      ));
    });
  });

  function parseFixture(fixture, dateFrom, dateTo) {
    const filepath = `${__dirname}/parseCalendarFixtures/${fixture}`;
    const iCalendarData = fs.readFileSync(filepath, 'utf8');
    return parseCalendar({ iCalendarData, dateFrom, dateTo });
  }

  function event(summary, start, end) {
    return {
      summary,
      start: new Date(start),
      end: new Date(end)
    };
  }
});
