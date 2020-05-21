import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "http://localhost";
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(url){
    return this.httpClient.get(this.REST_API_SERVER + url);
  }

  public sendData(url:string, json){
    this.httpClient.put(this.REST_API_SERVER + url, json).subscribe({
      error: error => console.error('There was an error!', error)
    })
  }
}
