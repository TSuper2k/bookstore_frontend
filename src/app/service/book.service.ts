import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})

export class BookService extends ApiService{
  private apiUrl = 'http://localhost:8081/api/books';
  getBooks(options = {}): Observable<any> {
    const web_url = this.web_url + 'books';
    return this.http.get<any>(web_url, {headers: this.headers}).pipe(

    );
  }

  getBookDetail(id: number): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url);
  }
  
}
