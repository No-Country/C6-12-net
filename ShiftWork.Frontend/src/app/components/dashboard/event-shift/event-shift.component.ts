import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/service/people.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { TaskShiftService } from 'src/app/service/task-shift.service';
import { PeopleModel } from 'src/app/Model/People';
import { ScheduleModel } from 'src/app/Model/Schedule';
import { AreaModel } from 'src/app/Model/Area';
import { LocationModel } from 'src/app/Model/Location';
import { TaskShiftModel } from 'src/app/Model/TaskShift';
import { AreaService } from 'src/app/service/area.service';
import { LocationService } from 'src/app/service/location.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-shift',
  templateUrl: './event-shift.component.html',
  styleUrls: ['./event-shift.component.css']
})
export class EventShiftComponent implements OnInit {

  person: PeopleModel = new PeopleModel();
  taskShift : TaskShiftModel = new TaskShiftModel();
  schedule: ScheduleModel = new ScheduleModel();
  area: AreaModel = new AreaModel();
  location: LocationModel = new LocationModel();

  TaskShifts : any;
  People : any;
  Locations: any;
  Areas: any;//Array<AreaModel> = [] ;

  constructor(private scheduleService:ScheduleService,
    private peopleService: PeopleService, private taskService : TaskShiftService,
    private areaService: AreaService, private locationService: LocationService,
    ) { }

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

    private getTaskShifts()
    {
      this.taskService.GetTaskShift().subscribe(
        (data) => {
          this.TaskShifts = data;
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
  
  
    onProfileChange(eventValue: any)
    {
      var id = eventValue.target.value;
      var obj = this.People.filter(function(data:PeopleModel) {
        return data.personId==id;
      });
      this.person = obj[0];
      //this.getShiftbyPersonId(this.person.personId);
      //console.log(this.person);
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

    onTaskShiftsChange(eventValue: any)
    {
      var id = eventValue.target.value;
  
      var obj = this.TaskShifts.filter(function(data:TaskShiftModel) {
        return data.taskShiftId==id;
      });
  
      this.taskShift = obj[0];
  
      console.log(this.taskShift);
  
    }


    scheduleId: number = 0;
    personId? : number;
    areaId? : number;
    locationId? : number;
    taskShiftId?: number;
    keyCode?: string;
    scheduledate?: string;
    startTime?: string;
    endTime?: string;

    tagColor?: string;

    saveShift()
  {
    this.schedule.personId = this.person.personId;
    this.schedule.taskShiftId = this.taskShift.taskShiftId;
    this.schedule.areaId = this.area.areaId;
    this.schedule.locationId = this.location.locationId;
    //this.schedule.scheduledate = new DatePipe('en-US').transform(this.schedule.scheduledate, 'dd/MM/yyyy');
    //this.schedule.scheduledate = //new Date().toDateString();

    console.log(this.schedule);
    this.scheduleService.PostSchedule(this.schedule).subscribe(
      resp => {
        console.log(resp);
      this.schedule.scheduleId = resp.scheduleId;

      }
    );


  }

  
  

  ngOnInit(): void {

    this.getAreas();
    this.getPeople();
    this.getLocations();
    this.getTaskShifts();
  }

}
