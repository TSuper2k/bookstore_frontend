import {Injectable} from '@angular/core';
import {ApiService} from './base-api.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class BookService extends ApiService {
  getBooks(options = {}): Observable<any> {
    const url = this.url + 'books';
    return this.http.get<any>(url, {headers: this.headers}).pipe(

    );
  }
}
