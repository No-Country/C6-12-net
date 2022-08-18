import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

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

  private baseApiUrl = localStorage.getItem("urlapi");
  response: any;
  data: any;
  endPoint = 'api/people/';

  GetPeople() {
    var url = env.apiUrl + this.endPoint;
    return this.http.get(url);
  }

  GetPerson(id:string) {
    var url =  env.apiUrl + this.endPoint + id;
    return this.http.get(url);
  }

  PostPerson(model: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let bodyString = JSON.stringify(model);
    console.log(bodyString);
    var url = env.apiUrl + this.endPoint;
    return this.http.post(url, bodyString, this.httpOptions);  
  }

  PutPerson(model: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let bodyString = JSON.stringify(model);
    console.log(bodyString);
    var url = env.apiUrl + this.endPoint;
    return this.http.put(url, bodyString, this.httpOptions);  
  }

  //DeletePerson(id: string)
  //{
  //  var headers = new Headers();
  //  headers.append('Content-Type', 'application/json');
  //  var url = env.apiUrl + this.endPoint + id;
  //  return this.http.delete(url);  
  //}

  DeletePerson(model: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let bodyString = JSON.stringify(model);
    console.log(bodyString);
    var url = env.apiUrl + this.endPoint+ model.PersonId;
    return this.http.delete(url);  
  }
}