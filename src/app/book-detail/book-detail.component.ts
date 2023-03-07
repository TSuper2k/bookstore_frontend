import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';
import { environment } from "../../environment";
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit {
  constructor( private route: ActivatedRoute, private bookService: BookService ) { }

  book!: Book;
  web_url = environment.webUrl;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookDetail(id).subscribe(book => this.book = book);
  }
}
