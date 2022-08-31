import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeopleService } from 'src/app/service/people.service';
import { ScheduleShiftModel } from 'src/app/Model/ScheduleShift';
import { ScheduleClockService } from 'src/app/service/schedule-clock.service';
import { PeopleModel } from 'src/app/Model/People';
import { TaskShiftModel } from 'src/app/Model/TaskShift';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { TaskShiftService } from 'src/app/service/task-shift.service';
import { ScheduleModel } from 'src/app/Model/Schedule';
import { AreaModel } from 'src/app/Model/Area';
import { LocationModel } from 'src/app/Model/Location';
import { AreaService } from 'src/app/service/area.service';
import { LocationService } from 'src/app/service/location.service';
import { ScheduleService } from 'src/app/service/schedule.service';


@Component({
  selector: 'app-clock-shift',
  templateUrl: './clock-shift.component.html',
  styleUrls: ['./clock-shift.component.css']
})
export class ClockShiftComponent implements OnInit, OnDestroy {
  time = new Date();
  rxTime = new Date();
  intervalId : any;
  subscription: any;

  scheduleShift : ScheduleShiftModel = new ScheduleShiftModel();
  person: PeopleModel = new PeopleModel();
  taskShift : TaskShiftModel = new TaskShiftModel();
  schedule: ScheduleModel = new ScheduleModel();
  area: AreaModel = new AreaModel();
  location: LocationModel = new LocationModel();

  People : any;
  Locations: any;
  Areas: any;//Array<AreaModel> = [] ;
  Shifts: any;
  Schedules: any;

  public clockActive : any = false;
  public startTime = new Date();
  public endTime = new Date();
  public clockTime = new Date();
  public hours : any;
  public minutes : any;
  

  constructor( protected http: HttpClient,
    private peopleService: PeopleService, private taskService : TaskShiftService,
    private areaService: AreaService, private locationService: LocationService,
    private scheduleClockService: ScheduleClockService, private scheduleService: ScheduleService 
    ) { 

      var personId = '1';
      peopleService.GetPerson(personId).subscribe(
        (data:any) => {
          console.log('person',data);
        }
      )
    }
    

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.time = new Date();
      if(this.clockActive)
      {
        const a = this.time.getTime();
        const b = this.startTime.getTime();
        var dif = a-b;
        const totalMinutes = ((a - b) / (1000 * 60) % 60);
        this.hours = Math.floor(totalMinutes / 60);          
        this.minutes = Math.round(totalMinutes % 60);
      }
    }, 1000);

    this.getAreas();
    this.getPeople();
    this.getLocations();
    this.getShifts();
    this.getSchedules();

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getNowUTC() {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }

  private getUTC(Date_:Date) {
    const now = Date_; //new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }

  private getfromUTC(Date_:Date) {
    const now = Date_; //new Date();
    return new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  }

  private getShiftbyPersonId(personId: any)
  {
    console.log(personId);
    this.scheduleClockService.GetScheduleShifts().subscribe(
      (data:any) => {
        var shifts = data.filter((t:ScheduleShiftModel) => t.personId == personId 
        && t.isActive == true);
        console.log(shifts);
        if (shifts?.length)
        {
          this.scheduleShift = shifts[0];
          console.log(this.scheduleShift);
          this.clockActive = true;
          this.startTime = this.getfromUTC(new Date(shifts[0].startTime));//new Date(shifts[0].startTime);

          console.log("startTime",shifts[0].startTime);
          console.log("converted",this.startTime);
          console.log(new Date);
        }
      }
    )
  }

  private getAreas()
  {
    this.areaService.GetAreas().subscribe(
      (data:any) => {
        this.Areas = data;
        console.log('areas', data);
      }
    );
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

  private getLocations()
  {
    this.locationService.GetLocations().subscribe(
      (data) => {
        this.Locations = data;
        console.log('locations', data);
      }
    );
  }

  private getShifts(id:any = 0)
  {
    this.scheduleClockService.GetScheduleShifts().subscribe(
      (data:any) => {
        if (id > 0)
        {
          this.Shifts = data.filter(function(data:ScheduleShiftModel)
          {
            return data.personId == id;
          })
        }
        else
        {
          this.Shifts = data;
        }
        console.log('shifts', data);
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


  onProfileChange(eventValue: any)
  {
    var id = eventValue.target.value;
    this.clockActive = false;
    var obj = this.People.filter(function(data:PeopleModel) {
      return data.personId==id;
    });
    this.person = obj[0];
    this.getShiftbyPersonId(this.person.personId);

    this.getShifts(id);
    this.getSchedules(id);

  }



  onAreaChange(eventValue: any)
  {
    var id = eventValue.target.value;
    var obj = this.Areas.filter(function(data:AreaModel) {
      return data.areaId==id;
    });

    this.area = obj[0];
    console.log(this.area);
  }

  onLocationChange(eventValue: any)
  {
    var id = eventValue.target.value;

    var obj = this.Locations.filter(function(data:LocationModel) {
      return data.locationId==id;
    });

    this.location = obj[0];

    console.log(this.location);

  }


  startClock()
  {
    this.clockActive = true;
    this.startTime = this.time;

    this.scheduleShift.startTime = this.time;
    this.scheduleShift.personId = this.person.personId;
    this.scheduleShift.description = this.taskShift.taskShiftName;
    this.scheduleShift.areaId = this.area.areaId;
    this.scheduleShift.locationId = this.location.locationId;
    this.scheduleShift.isActive = true;
    this.scheduleShift.isDeleted = false;
    this.scheduleShift.endTime = this.startTime;
    this.scheduleShift.subject = this.person.firstName;
    this.scheduleShift.updated = this.time;
    this.scheduleShift.created = this.time;

    console.log(this.scheduleShift);
    this.scheduleClockService.PostScheduleShift(this.scheduleShift).subscribe(
      resp => {
        console.log(resp);
      this.scheduleShift.scheduleShiftId = resp.scheduleShiftId;

      }
    );


  }

  stopClock()
  {
    this.clockActive = false;
    this.endTime = this.time;

    this.scheduleShift.endTime = this.endTime;
    this.scheduleShift.updated = this.time;
    this.scheduleShift.isActive = false;

    this.scheduleClockService.PutScheduleShift(this.scheduleShift).subscribe(
      resp => {
        console.log(resp)
        this.scheduleShift = new ScheduleShiftModel();
      }
    );
  }

}
function t(t: any, arg1: any, arg2: boolean) {
  throw new Error('Function not implemented.');
}

