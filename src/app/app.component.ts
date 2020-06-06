import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "./data.service";
import {catchError, map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Veronica';
  isLogged : boolean;
  user : string;

  constructor(private router: Router, private dataService: DataService) {
    this.CheckLogin();

  }

  public CheckLogin(){
    //Check if is logged
    //TODO Refresh navbar when the user is logged
    this.dataService.sendGetRequest("/api/check").subscribe( (data: string)=> {
        console.log(data)
        if (data === "OK"){
          this.isLogged = true;
          this.user = JSON.parse(localStorage.getItem("user")).Name
          this.router.navigateByUrl('/projects');
        }
        else {
          this.isLogged = false;
          this.router.navigateByUrl('/');
        }
      },
      error => {
        this.isLogged = false;
        this.router.navigateByUrl('/');
      }
    );
  }
}
