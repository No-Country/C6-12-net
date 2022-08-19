import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { resourceConferenceData } from '../../data';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel,MonthService, WorkWeekService, View, GroupModel, TimelineViewsService, TimelineMonthService, DayService,
  ResizeService, DragAndDropService, ResourceDetails, ScheduleComponent
} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './scheduleShift.component.html',
  styleUrls:  ['./scheduleShift.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, MonthService, WorkWeekService, TimelineViewsService, ResizeService, DragAndDropService]
})
export class ScheduleShiftComponent {

  constructor(public auth: AuthService) {    
  }

  public data: Record<string, any>[] = extend([], resourceConferenceData, '', true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 5, 5);
  public currentView: View = 'WorkWeek';
  public resourceDataSource: Record<string, any>[] = [
    { Text: 'Margaret', Id: 1, Color: '#1aaa55' },
    { Text: 'Robert', Id: 2, Color: '#357cd2' },
    { Text: 'Laura', Id: 3, Color: '#7fa900' }
  ];
  public group: GroupModel = { allowGroupEdit: true, resources: ['Conferences'] };
  public allowMultiple = true;
  public eventSettings: EventSettingsModel = {
    dataSource: resourceConferenceData,
    fields: {
      subject: { title: 'Conference Name', name: 'Subject' },
      description: { title: 'Summary', name: 'Description' },
      startTime: { title: 'From', name: 'StartTime' },
      endTime: { title: 'To', name: 'EndTime' }
    }
  };

  public getEmployeeName(value: ResourceDetails): string {
    return ((value as ResourceDetails).resourceData) ?
      (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.name!] as string
      : value.resourceName!;
  }

  public getEmployeeDesignation(value: ResourceDetails): string {
    const resourceName: string = this.getEmployeeName(value);
    return (resourceName === 'Margaret') ? 'Sales Representative' : (resourceName === 'Robert') ?
      'Vice President, Sales' : 'Inside Sales Coordinator';
  }

  public getEmployeeImage(value: ResourceDetails): string {
    const resourceName: string = this.getEmployeeName(value);
    return resourceName.replace(' ', '-').toLowerCase();
  }

  logOut(){
    this.auth.logout();
    console.log(this.auth.user$)
  }

}
