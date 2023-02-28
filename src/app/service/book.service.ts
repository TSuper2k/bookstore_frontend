import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class BookService extends ApiService{
  getBooks(options = {}): Observable<any> {
    // const api_url = this.api_url + 'books';
    const web_url = this.web_url + 'books';
    return this.http.get<any>(web_url, {headers: this.headers}).pipe(

    );
  }
}
