import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { environment } from "../../environment";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public books : any = [];
  public grandTotal : number = 0;

  web_url = environment.webUrl;

  constructor(private cart : CartService) {};

  ngOnInit(): void {
    this.cart.getBooks().subscribe(response=>{
      this.books = response;
      this.grandTotal = this.cart.getTotalPrice();
    })
  }

  removeCartItem(item : any){
    this.cart.removeCartItem(item);
  }

  emptyCart(){
    this.cart.removeAllCart();
  }

  checkout(){
    const books = this.books;
    const totalPrice = this.grandTotal;
    this.cart.checkout(books, totalPrice).subscribe(response => {
      // Xử lý kết quả trả về từ server nếu cần
    });
  }
}
