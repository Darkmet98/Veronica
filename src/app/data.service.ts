import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "http://localhost";
  constructor(private httpClient: HttpClient) { }

  private headers= new HttpHeaders()
    .set('content-type', 'application/json');

  public sendGetRequest(url){
    return this.httpClient.get(this.REST_API_SERVER + url, { 'headers': this.headers });
  }

  public sendData(url:string, json){
    this.httpClient.put(this.REST_API_SERVER + url, json, { 'headers': this.headers }).subscribe({
      error: error => console.error('There was an error!', error)
    })
  }

  public login(json){
    return this.httpClient.post(this.REST_API_SERVER + "/api/login_check", json, { 'headers': this.headers })
  }
}
