import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { People } from '../../Model/People';
import { HttpClient } from '@angular/common/http';
import { PeopleService } from 'src/app/service/people.service';


@Component({
  selector: 'app-dashboard',
  //template: `<ejs-schedule></ejs-schedule>`,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileJson: string = "";
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
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),    
    );
    console.log(this.profileJson)

  }
  logOut(){
    this.auth.logout();
    console.log(this.auth.user$)
  }
}
