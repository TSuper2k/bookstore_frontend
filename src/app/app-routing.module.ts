import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NgModule} from '@angular/core';
import {LoginComponent} from "./auth/login/login.component";
import {BookListComponent} from "./book-list/book-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
