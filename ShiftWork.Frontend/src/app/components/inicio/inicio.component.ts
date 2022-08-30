import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from '../../service/login-service.service';
import { PeopleModel } from '../../Model/People';
import { LoginModel } from '../../Model/Login';




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
login :LoginModel = new LoginModel();




constructor(private loginService:LoginServiceService,
            private router:Router){}
ngOnInit(): void {}

log(form:NgForm){
  console.log("click")
  if(form.invalid){
    console.log('Formulario invalido');
    return;
  }else{
    this.loginService.login(this.login).subscribe(data=>this.router.navigate(['/dashboard']));
  }

  }
 
 
}








