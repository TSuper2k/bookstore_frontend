import { Component } from '@angular/core';
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

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
