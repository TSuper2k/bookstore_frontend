import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../models/book';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BookService extends ApiService{
  private apiUrl = 'http://localhost:8081/api/books';

  getBooks(){
    return this.http.get<any>("http://localhost:8081/api/books")
    .pipe(map((response:any) => {
      return response;
    }))
  }

  getBookDetail(id: number): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url);
  }
}
