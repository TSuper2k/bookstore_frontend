import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
// import {AuthService} from "../auth.service";
// import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) {

  }

  onSubmit(email: any, password: any) {
    console.log(email)
    console.log(password)
    this.authService.login(email, password).subscribe(
        (result: any) => {
        console.log(result)
      }, (error: any) => {
        console.log(error)
      }
    );
  }

}
