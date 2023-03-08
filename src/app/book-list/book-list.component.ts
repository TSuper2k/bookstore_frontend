import { Component, OnInit } from '@angular/core';
import { environment } from "../../environment";
import { CartService } from '../service/cart.service';
import { AuthService } from "src/app/service/auth.service";
import { BookService } from '../service/book.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  constructor(private cart: CartService, private authService: AuthService,
    private book: BookService, private router: Router) { }
  web_url = environment.webUrl;

  public bookList: any;
  public totalItem: number = 0;

  ngOnInit(): void {
    this.book.getBooks().subscribe(response => {
      this.bookList = response;

      this.bookList.forEach((bookItem: any) => {
        Object.assign(bookItem, { quantity: 1, total: bookItem.price });
      });

      this.cart.getCartItems().subscribe(response => {
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

  // logout() {
  //   this.authService.logout().subscribe(response => {
  //     localStorage.removeItem('access_token');
  //     this.router.navigate(['/login']);
  //   });
  // }

  logout() {
    this.authService.logout();
  }
}
