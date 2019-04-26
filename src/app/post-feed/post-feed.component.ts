import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {

  /**Feed of LOGGED IN USER posts only */

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getAllPosts().subscribe(
      data => console.log(data),
      err => console.error(err),
      () => console.log('Success!')
    );
  }

}
