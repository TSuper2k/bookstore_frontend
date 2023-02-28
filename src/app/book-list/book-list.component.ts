import { Component, OnInit } from '@angular/core';
import { environment } from "../../environment";
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  // api_url = environment.api_url;
  web_url = environment.web_url;

  public bookList : any;

  public totalItem : number = 0;

  constructor(private api: ApiService, private cart: CartService) { }

  ngOnInit(): void {
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
}
