import { Component, OnInit } from '@angular/core';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { AuthService } from '@auth0/auth0-angular';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService,MonthAgendaService, AgendaService,TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  //styleUrls: ['./schedule.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
  //template: `<ejs-schedule> </ejs-schedule>`,
  styleUrls:  ['../../../styles.css']
})
export class ScheduleComponent implements OnInit {

  constructor(public auth: AuthService) { 

    
  }

  public data: object[] = [{
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2018, 1, 15, 10, 0),
    EndTime: new Date(2018, 1, 15, 12, 30)
      }];
      public eventSettings: EventSettingsModel = {
    dataSource: this.data
      }

  ngOnInit(): void {
  }
  logOut(){
    this.auth.logout();
    console.log(this.auth.user$)
  }

}
