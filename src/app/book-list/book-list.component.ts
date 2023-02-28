import { Component, OnInit } from '@angular/core';
import {BookService} from "../api-services/book.service";
import {environment} from "../../environment";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  url = environment.web_url;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(response => {
        this.books = response;
    });
  }
}
