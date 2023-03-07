import { Component, OnInit } from '@angular/core';
import { environment } from "../../environment";
import { CartService } from '../service/cart.service';
import { AuthService } from "src/app/service/auth.service";
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  constructor(private cart: CartService, private authService: AuthService, private book: BookService) { }
  web_url = environment.webUrl;

  public bookList: any;
  public totalItem: number = 0;

  ngOnInit(): void {
    this.book.getBooks().subscribe(response => {
      this.bookList = response;

      this.bookList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });

      this.cart.getBooks().subscribe(response => {
        this.totalItem = response.length;
      })
    })
  }

  addToCart(book: any) {
    this.cart.addToCart(book);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
