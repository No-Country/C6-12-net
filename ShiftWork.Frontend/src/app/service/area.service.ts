import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

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
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  response: any;
  data: any;
  endPoint = 'api/Area/';

  GetAreas() {
    var url = env.apiUrl + this.endPoint;
    return this.http.get(url);
  }

  GetArea(id:string) {
    var url =  env.apiUrl + this.endPoint + id;
    return this.http.get(url);
  }

  PostArea(model: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let bodyString = JSON.stringify(model);
    console.log(bodyString);
    var url = env.apiUrl + this.endPoint;
    return this.http.post(url, bodyString, this.httpOptions);  
  }

  PutArea(model: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let bodyString = JSON.stringify(model);
    console.log(bodyString);
    var url = env.apiUrl + this.endPoint;
    return this.http.put(url, bodyString, this.httpOptions);  
  }

  //DeleteArea(id: string)
  //{
  //  var headers = new Headers();
  //  headers.append('Content-Type', 'application/json');
  //  var url = env.apiUrl + this.endPoint + id;
  //  return this.http.delete(url);  
  //}

  DeleteArea(model: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let bodyString = JSON.stringify(model);
    console.log(bodyString);
    var url = env.apiUrl + this.endPoint+ model.AreaId;
    return this.http.delete(url);  
  }
}
