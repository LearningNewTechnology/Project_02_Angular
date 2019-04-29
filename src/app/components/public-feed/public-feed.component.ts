import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-public-feed',
  templateUrl: './public-feed.component.html',
  styleUrls: ['./public-feed.component.css']
})
export class PublicFeedComponent implements OnInit {

  /**Feed of ALL USERS posts only */
  public posts: any;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getAllPosts().subscribe(
      data => this.posts = data,
      err => console.error(err)
    );
  }

}
