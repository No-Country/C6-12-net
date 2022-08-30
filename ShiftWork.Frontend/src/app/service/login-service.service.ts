import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PeopleModel } from '../Model/People';
import { environment as env } from '../../environments/environment';
import { personalData } from '../data';
import { map } from 'rxjs';
import { LoginModel } from '../Model/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  endPoint = 'api/People/login';
  constructor(private http:HttpClient) {
    }
    public httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    response: any;
    data: any
   login(model:LoginModel){
    var url = env.apiUrl + this.endPoint;
    console.log(model);
    return this.http.post(url,model,this.httpOptions).pipe(map((resp:any)=>{
      console.log(resp);
      return resp; 
    })
    );
   }
}
