import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {

  /**Feed of LOGGED IN USER posts only */

  constructor() { }

  ngOnInit() {
  }

}
