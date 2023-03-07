import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected api_url = environment.apiUrl;
  protected web_url = environment.webUrl;

  protected headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json');

  constructor(protected http : HttpClient) { }

  public static getAccessToken() {
    return localStorage.getItem('access_token');
  }

  protected getAuthorization() {
    const headers = this.headers;
    return headers.set('Authorization', 'Bearer ' + ApiService.getAccessToken());
  }
}
