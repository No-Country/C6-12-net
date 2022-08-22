import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { PeopleService } from 'src/app/service/people.service';

@Component({
  selector: 'app-clock-shift',
  templateUrl: './clock-shift.component.html',
  styleUrls: ['./clock-shift.component.css']
})
export class ClockShiftComponent implements OnInit {

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
  }

  logOut(){
    this.auth.logout();
    console.log(this.auth.user$)
  }

}
