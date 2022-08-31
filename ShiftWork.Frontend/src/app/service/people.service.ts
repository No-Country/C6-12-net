import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { PeopleModel } from '../Model/People';
import { map,Observable } from 'rxjs';

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
    return this.http.get(url)
      .pipe();
  }

  PostPerson(model: PeopleModel)
  {
    var url = env.apiUrl + this.endPoint;
    return this.http.post(url, model, this.httpOptions)
      .pipe(
        map( (resp: any) => {
          console.log(resp);
          model.personId = resp.personId;
          return model;
        })
      );
  }

  PutPerson(model: PeopleModel)
  {
    var url = env.apiUrl + this.endPoint+ model.personId;
    return this.http.put(url,model, this.httpOptions)
    .pipe(
      map( (resp: any) => {
        console.log(resp);
        //model.areaId = resp.areaId;
        return model;
      })
    );
  }

  findByName(name: any): Observable<PeopleModel[]> {
    return this.http.get<PeopleModel[]>(`${env.apiUrl}?name=${name}`);
  }

  //DeletePerson(id: string)
  //{
  //  var headers = new Headers();
  //  headers.append('Content-Type', 'application/json');
  //  var url = env.apiUrl + this.endPoint + id;
  //  return this.http.delete(url);  
  //}

  DeletePerson(id: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var url = env.apiUrl + this.endPoint + id;
    return this.http.delete(url);
  }
}