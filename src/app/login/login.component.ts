import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DataService} from "../data.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../interfaces/User";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router, private appComponent : AppComponent) { }

  ngOnInit(): void {
    this.appComponent.CheckLogin();
  }

  user: User;
  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  //Creates the form
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    //Check the validation
    if (this.form.valid) {
      //create dataservice framework and try to login
      this.dataService.login(this.form.value).subscribe({
        //Catch an error or the user and password is incorrect
        error: () => this.appComponent.openSnackBar("The user or password is incorrect."),
        //Logged successfully
        next: value => {
          //Write the user to the localstorage
          this.user = {
            Token: value["token"],
            Name: value["data"]["user"],
            Id: value["data"]["id"]
          }
          localStorage.setItem("user", JSON.stringify(this.user));

          this.appComponent.openSnackBar("You are now logged, redirecting to the project page...");
          this.appComponent.CheckLogin();
        }
      })
    }
  }



}
