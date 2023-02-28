import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NgModule} from '@angular/core';
import {LoginComponent} from "./auth/login/login.component";
import {BookListComponent} from "./book-list/book-list.component";
import { CartComponent } from "./cart/cart.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/book-list',
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'book-list',
    component: BookListComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
