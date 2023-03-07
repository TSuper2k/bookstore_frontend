import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${environment.apiUrl}/login`;

    return this.http.post(url, JSON.stringify({email, password}), { headers, withCredentials: true })
    .pipe(
      map((response: any) => {
        const { access_token, user_id } = response;
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

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
}
