import { Component, OnInit, ViewChild, Input, OnDestroy, ElementRef } from '@angular/core';
import { MatButton } from '@angular/material';
import { post } from 'selenium-webdriver/http';
import { DatabaseService } from '../database.service';
import { Post } from '../post';
import { Compiler_compileModuleSync__POST_R3__ } from '@angular/core/src/linker/compiler';
import { PostLike } from 'src/postLike';
import { pipe } from '@angular/core/src/render3';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @ViewChild(MatButton) thumb: MatButton;
  @ViewChild('ProfilePic') pic: ElementRef;

  @Input() public post: Post;
  public likes: number;
  public picStyles = {
    'background-image': "url('assets/img/RainbowPls.gif')",
    'background-size': 'cover'
  };
  private postLike: PostLike = new PostLike();


  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.likes = this.post.postLikes.length || 0;
    console.log(this.pic.nativeElement.style);
    //this.picStyles["background-image"] = "url('"+url-from-aws+"')"
  }

  ngOnDestroy() {

  }

  public Like(): void {
    if (this.thumb.color == undefined) {
      this.thumb.color = "warn";
      this.postLike.author = { id: JSON.parse(localStorage.getItem('USER')).id };
      this.postLike.post = { id: this.post.id };

      this.db.likePost(this.postLike).subscribe(
        data => { },
        err => console.error('Like error: ', err),
        () => this.likes++
      );
    }
    else {
      this.thumb.color = undefined;
      this.postLike.author = { id: JSON.parse(localStorage.getItem('USER')).id };
      this.postLike.post = { id: this.post.id };

      this.db.unlikePost(this.postLike).subscribe(
        data => { },
        err => console.error('Like error: ', err),
        () => this.likes--
      );
    }
  }

}
