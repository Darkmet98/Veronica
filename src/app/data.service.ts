import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "http://localhost";
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(url){
    return this.httpClient.get(this.REST_API_SERVER + url, { 'headers': this.getToken(true) });
  }

  public sendPostRequest(url, json){
    return this.httpClient.post(this.REST_API_SERVER + url,json, { 'headers': this.getToken(true) });
  }

  public sendData(url:string, json){
    this.httpClient.put(this.REST_API_SERVER + url, json, { 'headers': this.getToken(true) }).subscribe({
      error: error => console.error('There was an error!', error)
    })
  }

  public login(json){
    return this.httpClient.post(this.REST_API_SERVER + "/api/login_check", json, { 'headers': this.getToken() })
  }

  private getToken(login:boolean=false){
    if(login){
      const userObject = localStorage.getItem("user");
      if (userObject != null){
        const token = JSON.parse(userObject).Token;
        return new HttpHeaders().set('content-type', 'application/json').set("authorization", "Bearer "+token)
      }
      return new HttpHeaders().set('content-type', 'application/json');
    }

    return new HttpHeaders().set('content-type', 'application/json');
  }

}
