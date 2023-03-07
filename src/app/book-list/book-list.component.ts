import { Component, OnInit } from '@angular/core';
import { environment } from "../../environment";
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import {AuthService} from "src/app/service/auth.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  constructor(private api: ApiService, private cart: CartService, private authService: AuthService) { }
  web_url = environment.webUrl;

  public bookList : any;

  public totalItem : number = 0;

  ngOnInit(): void {
    const successMessage = localStorage.getItem('successMessage');
    if (successMessage) {
      // hiển thị thông báo cho người dùng
      alert(successMessage);
      localStorage.removeItem('successMessage');
    }
    this.api.getBook().subscribe(response => {
      this.bookList = response;

      this.bookList.forEach((a:any) => {
        Object.assign(a, {quantity:1,total:a.price});
      });

      this.cart.getBooks().subscribe(response=>{
        this.totalItem = response.length;
      })
    })
  }

  addToCart(book: any){
    this.cart.addToCart(book);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
