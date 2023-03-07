import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  public cartItemList: any = [];
  public bookList = new BehaviorSubject<any>([]);
  public grandTotal: number = 0;

  getBooks() {
    return this.bookList.asObservable();
  }

  setBooks(book: any) {
    this.cartItemList.push(...book);
    this.bookList.next(book);
  }

  addToCart(book: any) {
    this.cartItemList.push(book);
    this.bookList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });

    return grandTotal;
  }

  removeCartItem(book: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (book.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.bookList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.bookList.next(this.cartItemList);
  }

  order(order: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.post(`${environment.apiUrl}/orders`, order, { headers: headers });
  }
}
