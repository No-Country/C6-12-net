import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
myApiUrl:string;
endpoint:string;
  constructor(private htpp:HttpClient) {
    this.myApiUrl=env.apiUrl;
    this.endpoint='api/location'
   }

  getLocation(){
    this.htpp.get(this.myApiUrl+this.endpoint+'getLocation')
  }
  PostLocation(location:Location):Observable<any>{
    return  this.htpp.post(this.myApiUrl+this.endpoint,location)
  }
  PutLocation(idLocation:number,location:Location):Observable<any>{
    return this.htpp.put(this.myApiUrl+this.endpoint+idLocation,location)
  }
  getLocationbyId(idLocation:number):Observable<any>{
    return this.htpp.get(this.myApiUrl+this.endpoint+idLocation)
  }
  DeleteLocation(idLocation:number):Observable<any>{
    return this.htpp.delete(this.myApiUrl+this.endpoint+idLocation)
  }

}
