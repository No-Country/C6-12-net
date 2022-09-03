import { EventInput } from '@fullcalendar/web-component';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR +'T08:00:00',
    end: TODAY_STR+ 'T14:00:00',
    allDay: false,
    backgroundColor: 'orange'

  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T06:00:00',
    end: TODAY_STR + 'T07:00:00',
    allDay: false,
    backgroundColor: 'red',


  }
];

export function createEventId() {
  return String(eventGuid++);
}
