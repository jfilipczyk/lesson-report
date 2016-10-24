/* eslint-disable func-names */
import { expect } from 'chai';
import moment from 'moment';
import groupEvents from './../../../src/background/services/groupEvents';

describe('groupEvents', () => {
  it('groups events by summary string', () => {
    const events = [
      event('group A# not important details'),
      event('group B# not important details'),
      event('group A# anything'),
      event('group C'),
    ];

    const groups = groupEvents(events);

    expect(groups).to.be.instanceof(Array);
    expect(groups.map(group => group.name)).to.include.members([
      'group A',
      'group B',
      'group C'
    ]);
  });

  it('calculates numOfEvents for group', () => {
    const events = [
      event('group A'),
      event('group A'),
    ];

    const groups = groupEvents(events);

    expect(groups[0]).to.have.property('numOfEvents', 2);
  });

  it('calculates totalTime in seconds for group', () => {
    const events = [
      event('group A', 100),
      event('group A', 200),
    ];

    const groups = groupEvents(events);

    expect(groups[0]).to.have.property('totalTime', 300);
  });

  function event(summary, durationInSec = 3600) {
    const start = new Date('2016-11-01 18:00');
    const end = moment(start).add(durationInSec, 'seconds').toDate();
    return { summary, start, end };
  }
});
