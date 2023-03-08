import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  public bookList = new BehaviorSubject<any>([]);

  getCartItems(): Observable<any> {
    return this.bookList.asObservable();
  }

  setCartItems(book: any) {
    this.bookList.next([...book]);
  }

  addToCart(book: any) {
    const currentCartItems = this.bookList.getValue();
    const existingCartItemIndex = currentCartItems.findIndex((item: any) => item.id === book.id);
    if (existingCartItemIndex > -1) {
      currentCartItems[existingCartItemIndex].quantity += book.quantity;
      currentCartItems[existingCartItemIndex].total = currentCartItems[existingCartItemIndex].price * currentCartItems[existingCartItemIndex].quantity;
    } else {
      currentCartItems.push(book);
    }
    this.setCartItems(currentCartItems);
  }

  getTotalPrice(): number {
    return this.bookList.getValue().reduce((total: number, item: any) => total + item.total, 0);
  }

  removeCartItem(book: any) {
    const currentCartItems = this.bookList.getValue();
    const updatedCartItems = currentCartItems.filter((item: any) => item.id !== book.id);
    this.bookList.next(updatedCartItems);
  }

  emptyCart() {
    this.bookList.next([]);
  }

  order(order: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.post(`${environment.apiUrl}/orders`, order, { headers: headers });
  }
}
