import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { PeopleService } from 'src/app/service/people.service';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";

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
  public clockActive : any = false;
  public startTime = new Date();
  public endTime = new Date();
  public clockTime = new Date();
  public hours : any;
  public minutes : any;
  

  constructor(public auth: AuthService, protected http: HttpClient,
    peopleService: PeopleService
    ) { 

      var personId = '1';
      peopleService.GetPerson(personId).subscribe(
        (data) => {
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

  logOut(){
    this.auth.logout();
    console.log(this.auth.user$)
  }

  startClock()
  {
    this.clockActive = true;
    this.startTime = this.time;
  }

  stopClock()
  {
    this.clockActive = false;
    this.endTime = this.time;
  }

}
