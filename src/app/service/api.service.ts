import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected api_url = environment.api_url;
  protected web_url = environment.web_url;

  protected headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json');

  constructor(protected http : HttpClient) { }

  public static getAccessToken() {
    return localStorage.getItem('access_token');
  }

  protected getAuthorization() {
    const headers = this.headers;
    return headers.set('Authorization', 'Bearer ' + ApiService.getAccessToken());
  }

  getBook(){
    return this.http.get<any>("http://localhost:8081/api/books")
    .pipe(map((response:any) => {
      return response;
    }))
  }
}
