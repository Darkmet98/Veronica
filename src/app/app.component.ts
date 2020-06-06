import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "./data.service";
import {catchError, map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Veronica';
  isLogged : boolean;
  user : string;

  constructor(private router: Router, private dataService: DataService, private _snackBar: MatSnackBar) {
    this.CheckLogin();

  }

  public CheckLogin(){
    //Check if is logged
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

  public Logout(){
    localStorage.removeItem("user");
    this.router.navigateByUrl('/');
    this.isLogged = false;
    this.openSnackBar("The session is closed...");
  }

  public openSnackBar(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 5000,
    });
  }
}
