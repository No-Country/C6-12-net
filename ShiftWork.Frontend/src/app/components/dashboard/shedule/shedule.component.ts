import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  defineFullCalendarElement,
  FullCalendarElement,
} from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { INITIAL_EVENTS, createEventId } from '../../../service/activity.service';
import { ScheduleService } from '../../../service/schedule.service';
import { PeopleService } from '../../../service/people.service';
import { ScheduleModel } from '../../../Model/Schedule';
import { PeopleModel } from '../../../Model/People';
import { Calendar, CalendarApi, EventInput } from '@fullcalendar/core';
import { filter, map, Observable } from 'rxjs';


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
 
  selectedEvent: any = [];
  events_ : any = [{
    title: "test",
    start: "2022-09-03T02:30:00",
    end: "2022-09-03T02:30:00",
    backgroundColor: "#96277e",
    borderColor: "#3c8dbc"
}];

  eventsSchedule: EventInput[] = [];
  TaskShifts: any;
  People: any;
  Schedules: any;
  schedule: ScheduleModel = new ScheduleModel();
  person: PeopleModel = new PeopleModel();
  //calendarEvents: any;


  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    events:[
      {
          "id": "10",
          "title": "Control",
          "start": "2022-09-03 T11:00",
          "end": "2022-09-03 T15:00",
          "color": "#1a5903",
          "allDay": false,
          "date": "2022-09-03T00:00:00"
      }
  ],
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

  calendarApi_: CalendarApi = new CalendarApi;

  @ViewChild('calendarEl') calendarRef!: ElementRef<FullCalendarElement> | ElementRef<FullCalendarElement>;


  constructor(private scheduleService: ScheduleService, private peopleService: PeopleService) {
    this.getSchedules();
    this.getPeople();
    //this.readEvents();

  }

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
    console.log(events);
    this.currentEvents = events;
  }



  onProfileChange(eventValue: any) {
    var id = eventValue.target.value;
    var obj = this.People.filter(function (data: PeopleModel) {
      return data.personId == id;
    });
    this.person = obj[0];
    this.getSchedules(id);

  }

  private getPeople() {
    this.peopleService.GetPeople().subscribe(
      (data) => {
        this.People = data;
      }
    );
  }

  private getSchedules(id: any = 0) {

    this.eventsSchedule = [];
    this.events_ = [];

    this.scheduleService.GetSchedules().subscribe(
      (data:any) => {
        if (id > 0) {

          data.filter((val:any) => {return val.personId == id}).forEach((r:ScheduleModel) => {

            var date = new Date((Date.parse(r.scheduledate)));
            let dateSTR = date.toISOString().replace(/T.*$/, '')

            this.events_.push({
              title: r.keyCode,
              start: dateSTR + 'T' + r.startTime + ':00',
              end: dateSTR + 'T' + r.startTime + ':00',
              backgroundColor: r.tagColor,
              borderColor: "#3c8dbc"
            })

          });
            this.calendarOptions = {
              ...this.calendarOptions,
              events: this.events_
            }  

        }
        else {
          this.Schedules = data;

          data.forEach((r:ScheduleModel) => {

            var date = new Date((Date.parse(r.scheduledate)));
            let dateSTR = date.toISOString().replace(/T.*$/, '')

            this.events_.push({
              title: r.keyCode,
              start: dateSTR + 'T' + r.startTime + ':00',
              end: dateSTR + 'T' + r.startTime + ':00',
              backgroundColor: r.tagColor,
              borderColor: "#3c8dbc"
            })

          });
          
          this.calendarOptions = {
            ...this.calendarOptions,
            events: this.events_
          } 

        }
      }
    );
  }


  ngOnInit(): void {


  let myevent = [{
      title: "test",
      start: "2022-09-03T02:30:00",
      end: "2022-09-03T02:30:00",
      backgroundColor: "#96277e",
      borderColor: "#3c8dbc"
  }];

  myevent.push({
    title: "test",
    start: "2022-09-04T02:30:00",
    end: "2022-09-04T02:30:00",
    backgroundColor: "#96277e",
    borderColor: "#3c8dbc"
  }
  );

  const suscription = this.readEvents().subscribe(
    (val:any)=> {
      myevent.push({
        title: val.title,
        start: val.start,
        end: val.end,
        backgroundColor: val.backgroundColor,
        borderColor: val.borderColor
      }
      );
    }
  );

  setTimeout(() => {
    // Unsubscribes BOTH subscription and childSubscription
      suscription.unsubscribe();
      
  }, 1000);

  this.calendarOptions = {
    ...this.calendarOptions,
    events: myevent
  }


    //let calendar = new Calendar(this.calendarRef.nativeElement,this.calendarOptions);



  }

  readEvents() {
    console.log('reading...');
    const scheduleObservable = new Observable(observer => {
      setTimeout(() => {
        this.scheduleService.GetSchedules().subscribe(
          (result: any) => {
            //console.log('readed', result);
            result.forEach((r: ScheduleModel) => {
              var date = new Date((Date.parse(r.scheduledate)));
              let dateSTR = date.toISOString().replace(/T.*$/, '')

              observer.next({
                title: r.keyCode,
                start: dateSTR + 'T' + r.startTime + ':00',
                end: dateSTR + 'T' + r.startTime + ':00',
                backgroundColor: r.tagColor,
                borderColor: "#3c8dbc"
              })
            });
          });

      }, 1000);
    });

    return scheduleObservable;
  }


}
