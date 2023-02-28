import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ApiService {
  protected url = environment.api_url;

  protected headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json');

  public static getAccessToken() {
    return localStorage.getItem('access_token');
  }

  constructor(protected http: HttpClient) {
  }

  protected getAuthorization() {
    const headers = this.headers;
    return headers.set('Authorization', 'Bearer ' + ApiService.getAccessToken());
  }
}
