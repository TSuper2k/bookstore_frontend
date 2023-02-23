import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User = new User();

  constructor(private router: Router, private http: HttpClient) {

  }

  init() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/listings']);
    }
    if (!this.user.id && this.accessToken()) {

    }
  }

  login(email: any, password: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const url = environment.api_url + 'login';
    return this.http.post(url, JSON.stringify({email, password}), {headers: headers, withCredentials: true}).pipe(
      map((response: any) => {
        const access_token = response['access_token'];
        localStorage.setItem('access_token', access_token);
        console.log(response);
      }),
    );
  }

  accessToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
}
