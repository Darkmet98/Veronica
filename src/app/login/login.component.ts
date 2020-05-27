import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DataService} from "../data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.dataService.login(this.form.value).subscribe({
        error: () => this.openSnackBar("El usuario o contraseña es incorrecto."),
        next: value => {
          console.log(value["token"]);
          this.openSnackBar("Has iniciado sesión.");
        }
      })
    }
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 5000,
    });
  }
}
