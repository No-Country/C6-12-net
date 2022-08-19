import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { People } from '../Model/People';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
myAppUrl:string;
myApiUrl:string;
  constructor(private http:HttpClient) {
    this.myApiUrl="api/People";
    this.myAppUrl="https://localhost:49153/"
   }
   login(people:People){
    return this.http.post(this.myAppUrl+this.myApiUrl,people);
   }


}
