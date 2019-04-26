import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @ViewChild(MatButton) thumb: MatButton;

  public likes: number = 0;

  constructor() { }

  ngOnInit() {
    
  }

  public Like(): void {
    if (this.thumb.color == undefined) {
      this.thumb.color = "warn";
      this.likes++;
    }
    else {
      this.thumb.color = undefined;
      this.likes--;
    }
  }

}
