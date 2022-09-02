import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  defineFullCalendarElement,
} from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { INITIAL_EVENTS, createEventId } from 'src/app/service/activity.service';


defineFullCalendarElement();

@Component({
    selector: 'app-shedule',
    templateUrl: './shedule.component.html',
    styleUrls: ['./shedule.component.css']
})
export class SheduleComponent implements OnInit {
    nuevoevento: any;

        showModal: boolean = false;
        name: string = "";
        date: string = "";
        semodule: string = "";
        activitytype: string = "";
        time_start: string = ""; 
        time_end: string = "";

    //calendarEvents: Array<any> = this.createDemoEvents();
    selectedEvent : any = [];


    calendarVisible = true;
    calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
    }
    currentEvents: EventApi[] = [];
  
    handleCalendarToggle() {
      this.calendarVisible = !this.calendarVisible;
    }
  
    handleWeekendsToggle() {
      this.calendarOptions = {
        ...this.calendarOptions,
        weekends: !this.calendarOptions.weekends
      }
    }
  
    handleDateSelect(selectInfo: DateSelectArg) {
      const title = prompt('Please enter a new title for your event');
      const calendarApi = selectInfo.view.calendar;
  
      calendarApi.unselect(); // clear date selection
  
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        });
      }
    }
  
    handleEventClick(clickInfo: EventClickArg) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }
    }
  
    handleEvents(events: EventApi[]) {
      this.currentEvents = events;
    }

    ngOnInit(): void {
      
    }
  
  }
  