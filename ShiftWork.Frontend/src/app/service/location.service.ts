import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { LocationModel } from '../Model/Location';
import { map, Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  response: any;
  data: any;
  endPoint = 'api/Locations/';


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

  GetLocations() {
    var url = env.apiUrl + this.endPoint;
    return this.http.get(url);
  }

  GetLocation(id:string) {
    var url =  env.apiUrl + this.endPoint + id;
    return this.http.get(url)
      .pipe();
  }

  PostLocation(model: LocationModel)
  {
    var url = env.apiUrl + this.endPoint;
    return this.http.post(url, model, this.httpOptions)
      .pipe(
        map( (resp: any) => {
          console.log(resp);
          model.locationId = resp.LocationId;
          return model;
        })
      );
  }

  PutLocation(model: LocationModel)
  {
    //let bodyString = JSON.stringify(model);
    //console.log(bodyString);
    var url = env.apiUrl + this.endPoint+ model.locationId;
    return this.http.put(url,model, this.httpOptions)
    .pipe(
      map( (resp: any) => {
        console.log(resp);
        //model.areaId = resp.areaId;
        return model;
      })
    );
  }

  DeleteLocation(id: any)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var url = env.apiUrl + this.endPoint + id;
    return this.http.delete(url);
  }

  findByName(name: any): Observable<LocationModel[]> {
    return this.http.get<LocationModel[]>(`${env.apiUrl}?name=${name}`);
  }
}
