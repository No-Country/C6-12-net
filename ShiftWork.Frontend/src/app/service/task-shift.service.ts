import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { TaskShiftModel } from '../Model/TaskShift';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskShiftService {

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
  endPoint = 'api/TaskShifts/';  //No encontre donde Buscar el nombre del endPoint

  GetTaskShift() {
    var url = env.apiUrl + this.endPoint;
    return this.http.get(url);
  }

  GetTaskShiftID(id:string) {
    var url =  env.apiUrl + this.endPoint + id;
    return this.http.get(url)
      .pipe();
  }

  PostTaskShift(model: TaskShiftModel)
  {
    var url = env.apiUrl + this.endPoint;
    return this.http.post(url, model, this.httpOptions)
      .pipe(
        map( (resp: any) => {
          console.log(resp);
          model.taskShiftId = resp.taskShiftId;
          return model;
        })
      );
  }

  PutTaskShift(model: TaskShiftModel)
  {
    //let bodyString = JSON.stringify(model);
    //console.log(bodyString);
    var url = env.apiUrl + this.endPoint+ model.taskShiftId;
    return this.http.put(url,model, this.httpOptions)
    .pipe(
      map( (resp: any) => {
        console.log(resp);
        //model.taskShiftId = resp.taskShiftId;
        return model;
      })
    );
  }

  DeleteTaskShift(id: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var url = env.apiUrl + this.endPoint + id;
    return this.http.delete(url);
  }

  findByName(name: any): Observable<TaskShiftModel[]> {
    return this.http.get<TaskShiftModel[]>(`${env.apiUrl}?name=${name}`);
  }
}
