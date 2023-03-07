import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit(email: any, password: any) {
    this.authService.login(email, password).subscribe(
        (result: any) => {
        console.log(result)
      }, (error: any) => {
        console.log(error)
      }
    );
  }
}
