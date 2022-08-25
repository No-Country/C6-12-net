
import {CalendarEvent,CalendarView,} from 'angular-calendar'
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';




@Component({
  selector: 'app-shedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.css']
})
export class SheduleComponent implements OnInit {

  ngOnInit(): void {
  }
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
}
