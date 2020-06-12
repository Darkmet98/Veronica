import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "./data.service";
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
        if (data === "OK"){ //The token works with Historie
          this.isLogged = true;
          this.user = JSON.parse(localStorage.getItem("user")).Name
          this.router.navigateByUrl('/projects');
        }
        else { //The token doesn't work with Historie
          this.isLogged = false;
          this.router.navigateByUrl('/');
        }
      },
      //The token has expired or Historie isn't avaliable
      error => {
        this.isLogged = false;
        this.router.navigateByUrl('/');
      }
    );
  }

  //Logout from Veronica
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
