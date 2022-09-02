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
import { INITIAL_EVENTS, createEventId } from 'src/app/service/activity.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { PeopleService } from 'src/app/service/people.service';
import { ScheduleModel } from 'src/app/Model/Schedule';
import { PeopleModel } from 'src/app/Model/People';
import { EventInput } from '@fullcalendar/web-component';
import { Calendar } from '@fullcalendar/core';


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

    eventsSchedule : EventInput[] = [];
    TaskShifts : any;
    People : any;
    Schedules : any;
    schedule: ScheduleModel = new ScheduleModel();
    person: PeopleModel = new PeopleModel();

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

    @ViewChild('calendar')
  calendarRef!: ElementRef<FullCalendarElement>;


    constructor(private scheduleService: ScheduleService,private peopleService:PeopleService){
      this.getSchedules();
      this.getPeople();
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

  

    onProfileChange(eventValue: any)
    {
      var id = eventValue.target.value;
      var obj = this.People.filter(function(data:PeopleModel) {
        return data.personId==id;
      });
      this.person = obj[0];
      this.getSchedules(id);
  
    }
  
    private getPeople()
    {
      this.peopleService.GetPeople().subscribe(
        (data) => {
          this.People = data;
          console.log('people', data);
        }
      );
    }

    private getSchedules(id: any = 0)
    {
      this.scheduleService.GetSchedules().subscribe(
        (data:any) => {
          if (id > 0)
          {
            this.Schedules = data.filter(function(data:ScheduleModel)
            {
              return data.personId == id;
            })
          }
          else
          {
            this.Schedules = data;
          }
          console.log('schedules', data);
        }
      );
    }
  

    ngOnInit(): void {

      let calendarApi = this.calendarRef.nativeElement.getApi();
      console.log(calendarApi?.getEvents);
        this.Schedules.forEach((r:ScheduleModel) => {
          calendarApi?.addEvent(
            {
              id: createEventId(),
              title: r.keyCode,
              start: r.startTime,
              end: r.endTime,
              color: r.tagColor,
              allDay: false,
              date: r.scheduledate

            }
          )
          
        });

     // const calendarApi = selectInfo.view.calendar;
  
     // calendarApi.unselect(); // clear date selection

    //  calendarApi.addEvent({
    //    id: createEventId(),
    //    title,
    //    start: selectInfo.startStr,
    //    end: selectInfo.endStr,
    //    allDay: selectInfo.allDay
    //  });
      
    }
  
  }
  