import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {

  /**Feed of LOGGED IN USER posts only */
  public posts: any;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getAllPostsByUser(JSON.parse(localStorage.getItem('USER')).id).subscribe(
      data => this.posts = data,
      err => console.error(err),
      () => console.log(this.posts)
    );
  }

}
