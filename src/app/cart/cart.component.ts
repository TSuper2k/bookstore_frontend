import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { environment } from "../../environment";
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public books : any = [];
  public grandTotal : number = 0;

  web_url = environment.webUrl;

  constructor(private cart : CartService, private auth: AuthService, private router: Router) {};

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

  checkout() {
    const totalPrice = this.grandTotal;
    const order = {
      books: this.cart.cartItemList.map((item: any) => ({book_id: item.id, quantity: item.quantity})),
      totalPrice: totalPrice,
    };

    this.cart.order(order).subscribe(response => {
      // Xử lý kết quả trả về từ server
      this.cart.removeAllCart();
      localStorage.setItem('successMessage', 'Checkout thành công');
      this.router.navigate(['/book-list']);

    });
  }
}
