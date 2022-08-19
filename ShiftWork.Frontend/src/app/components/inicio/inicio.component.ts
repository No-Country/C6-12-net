import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthModule } from '@auth0/auth0-angular';
import { LoginServiceService } from '../../service/login-service.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public auth: AuthService,
    private router:Router,
    private loginService:LoginServiceService) {}

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe(isAuthenticaded=>{
  if(isAuthenticaded){
    this.auth.user$.subscribe()
  this.router.navigate(['/dashboard'])
}
})
}
login(){
this.auth.loginWithRedirect ()

}

}


