import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Role } from '../Model/Role'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 myApiUrl:string;
 endpoint:string;
  constructor(private http:HttpClient) {
    this.myApiUrl= env.apiUrl;
    this.endpoint='api/role/';
   }
   PostRole(role:Role ):Observable<any>{
      return this.http.post(this.myApiUrl+this.endpoint,role);
  }
  GetRole():Observable<any>{
    return this.http.get(this.myApiUrl+this.endpoint+'GetRole')
  }
  GetRolebyId(idRole:number):Observable<any>{
    return this.http.get(this.myApiUrl+this.endpoint+idRole)
  }
  DeleteRole(idArea:number):Observable<any>{
    return this.http.delete(this.myApiUrl+this.endpoint+idArea)
  }
  PutRole(idRole:number,role:Role):Observable<any>{
    return this.http.put(this.myApiUrl+this.endpoint+idRole,role)
  }
}


