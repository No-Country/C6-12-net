//import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ClienteServiceProvider {

  static get parameters() {
    return [[HttpClient]];
  }

  //iconfig: string;

  constructor(protected http: HttpClient) {
    console.log('Hello ClienteServiceProvider Provider');
  }

  private baseApiUrl = localStorage.getItem("urlapi");
  response: any;
  data: any;

  GetClientes() {
    var url = this.baseApiUrl + 'people/';
    return this.http.get(url);
  }
}