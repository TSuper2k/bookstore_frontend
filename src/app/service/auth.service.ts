import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';
import { Router } from "@angular/router";
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const url = `${this.apiUrl}/login`;

    return this.http.post(url, JSON.stringify({email, password}), { headers: this.headers, withCredentials: true })
    .pipe(
      map((response: any) => {
        const { access_token } = response;
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['/book-list']);
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  // logout() {
  //   return this.http.get(this.apiUrl + '/logout');
  // }


  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
}
