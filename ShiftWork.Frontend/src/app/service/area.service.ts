import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { AreaModel } from '../Model/Area';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

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
  endPoint = 'api/Areas/';

  GetAreas() {
    var url = env.apiUrl + this.endPoint;
    return this.http.get(url);
  }

  GetArea(id:string) {
    var url =  env.apiUrl + this.endPoint + id;
    return this.http.get(url)
      .pipe();
  }

  PostArea(model: AreaModel)
  {
    var url = env.apiUrl + this.endPoint;
    return this.http.post(url, model, this.httpOptions)
      .pipe(
        map( (resp: any) => {
          console.log(resp);
          model.areaId = resp.areaId;
          return model;
        })
      );
  }

  PutArea(model: AreaModel)
  {
    //let bodyString = JSON.stringify(model);
    //console.log(bodyString);
    var url = env.apiUrl + this.endPoint+ model.areaId;
    return this.http.put(url,model, this.httpOptions)
    .pipe(
      map( (resp: any) => {
        console.log(resp);
        //model.areaId = resp.areaId;
        return model;
      })
    );
  }

  DeleteArea(id: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var url = env.apiUrl + this.endPoint + id;
    return this.http.delete(url);
  }

  //DeleteArea(model: any)
  //{
  //  var headers = new Headers();
  //  headers.append('Content-Type', 'application/json');
  //  let bodyString = JSON.stringify(model);
  //  console.log(bodyString);
  //  var url = env.apiUrl + this.endPoint+ model.AreaId;
  //  return this.http.delete(url);
  //}

  findByName(name: any): Observable<AreaModel[]> {
    return this.http.get<AreaModel[]>(`${env.apiUrl}?name=${name}`);
  }
}
