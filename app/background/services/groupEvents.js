import moment from 'moment';

export default function groupEvents(events) {
  return events
    .map(
      event => ({
        name: extractGroupName(event),
        numOfEvents: 1,
        totalTime: calculateDuration(event)
      })
    )
    .reduce(
      (groups, value) => {
        const group = groups.find(g => g.name === value.name);
        if (group) {
          group.numOfEvents += value.numOfEvents;
          group.totalTime += value.totalTime;
        } else {
          groups.push(value);
        }
        return groups;
      },
      []
    );
}

function extractGroupName(event) {
  return event.summary.split('#')[0];
}

function calculateDuration(event) {
  return moment(event.end).diff(event.start, 'seconds');
}
