import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Usuario } from '../../Model/usuario';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileJson: string = "";
  constructor(public auth: AuthService, protected http: HttpClient
    ) { 
      var url ='https://localhost:49155/api/People/';
      this.http.get(url).subscribe(
        (data) => {
          console.log('people',data);
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
