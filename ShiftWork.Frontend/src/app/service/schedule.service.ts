import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { ScheduleModel } from '../Model/Schedule';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  static get parameters() {
    return [[HttpClient]];
  }
  constructor(protected http: HttpClient) {
    console.log('Hello ClienteServiceProvider Provider');
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  response: any;
  data: any;
  endPoint = 'api/Schedules/';

  GetSchedules() {
    var url = env.apiUrl + this.endPoint;
    return this.http.get(url);
  }

  GetSchedule(id:string) {
    var url =  env.apiUrl + this.endPoint + id;
    return this.http.get(url)
      .pipe();
  }

  PostSchedule(model: ScheduleModel)
  {
    var url = env.apiUrl + this.endPoint;
    return this.http.post(url, model, this.httpOptions)
      .pipe(
        map( (resp: any) => {
          console.log(resp);
          model.scheduleId = resp.ScheduleId;
          return model;
        })
      );
  }

  PutSchedule(model: ScheduleModel)
  {
    //let bodyString = JSON.stringify(model);
    //console.log(bodyString);
    var url = env.apiUrl + this.endPoint+ model.scheduleId;
    return this.http.put(url,model, this.httpOptions)
    .pipe(
      map( (resp: any) => {
        console.log(resp);
        //model.scheduleId = resp.scheduleId;
        return model;
      })
    );
  }

  DeleteSchedule(id: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var url = env.apiUrl + this.endPoint + id;
    return this.http.delete(url);
  }
}
  //DeleteSchedule(model: any)
  //{
  //  var headers = new Headers();
  //  headers.append('Content-Type', 'application/json');
