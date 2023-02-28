import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public books : any = [];
  public grandTotal : number = 0;

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
}
