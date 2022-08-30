import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { ScheduleShiftModel } from '../Model/ScheduleShift';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleClockService {

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
  endPoint = 'api/ScheduleShifts/';

  GetScheduleShifts() {
    var url = env.apiUrl + this.endPoint;
    return this.http.get(url);
  }

  GetScheduleShift(id:string) {
    var url =  env.apiUrl + this.endPoint + id;
    return this.http.get(url)
      .pipe();
  }

  PostScheduleShift(model: ScheduleShiftModel)
  {
    var url = env.apiUrl + this.endPoint;
    return this.http.post(url, model, this.httpOptions)
      .pipe(
        map( (resp: any) => {
          console.log(resp);
          model = resp;
          return resp;
        })
      );
  }

  PutScheduleShift(model: ScheduleShiftModel)
  {
    //let bodyString = JSON.stringify(model);
    //console.log(bodyString);
    var url = env.apiUrl + this.endPoint+ model.scheduleShiftId;
    return this.http.put(url,model, this.httpOptions)
    .pipe(
      map( (resp: any) => {
        console.log(resp);
        //model.areaId = resp.areaId;
        return model;
      })
    );
  }

  DeleteScheduleShift(id: any)
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
