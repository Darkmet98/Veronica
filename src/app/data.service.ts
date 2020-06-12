import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //HISTORIE URL
  public REST_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  //Send get request to Historie
  public sendGetRequest(url){
    return this.httpClient.get(this.REST_API_SERVER + url, { 'headers': this.getToken(true) });
  }

  //Send post request to Historie
  public sendPostRequest(url, json){
    return this.httpClient.post(this.REST_API_SERVER + url,json, { 'headers': this.getToken(true) });
  }

  //Send data from Veronica to Historie
  public sendData(url:string, json){
    this.httpClient.put(this.REST_API_SERVER + url, json, { 'headers': this.getToken(true) }).subscribe({
      error: error => console.error('There was an error!', error)
    })
  }

  //Create login data
  public login(json){
    return this.httpClient.post(this.REST_API_SERVER + "/api/login_check", json, { 'headers': this.getToken() })
  }

  //Check the Token from Historie
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
