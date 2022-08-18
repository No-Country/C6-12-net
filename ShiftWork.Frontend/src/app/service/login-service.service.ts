import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Usuario } from '../Model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
myAppUrl:string;
myApiUrl:string;
  constructor(private http:HttpClient) {
    this.myApiUrl="api/people";
    this.myAppUrl="https://localhost:49153/"
   }
   login(usuario:Usuario){
    return this.http.post(this.myAppUrl+this.myApiUrl,usuario);
   }


}
