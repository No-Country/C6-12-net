import { EventInput } from '@fullcalendar/web-component';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR,
    end: TODAY_STR+ 'T2:00:00',
    allDay: false,
    color: 'orange'

  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T3:00:00',
    end: TODAY_STR + 'T2:00:00',
    allDay: false,
    backgroundColor: 'red'

  }
];

export function createEventId() {
  return String(eventGuid++);
}
