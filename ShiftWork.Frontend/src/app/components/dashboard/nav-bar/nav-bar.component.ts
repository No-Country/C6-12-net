import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { AuthService } from '@auth0/auth0-angular';
import { PeopleService } from 'src/app/service/people.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  profileJson: string = "";
  userLog: string = "";

	
  constructor( protected http: HttpClient,
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
    //this.auth.user$.subscribe(
    //  (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),    
    //);
    console.log(this.profileJson)

  }
  logOut(){
    //this.auth.logout();
    //console.log(this.auth.user$)
  }

}
