import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material';
import { PostLike } from '../../classes/postLike';
import { DatabaseService } from '../../services/database.service';
import { Post } from '../../classes/post';

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
  public disableLike: boolean = false;
  public picStyles = {
    'background-image': "url('assets/img/RainbowPls.gif')",
    'background-size': 'cover'
  };
  private postLike: PostLike = new PostLike();
  private url: string;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.likes = this.post.postLikes.length || 0;
    if (this.post.friends[0] === JSON.parse(localStorage.getItem('USER'))) {
      this.disableLike = true;
    }
    for (let i = 0; i < this.post.postLikes.length; i++) {
      if (this.post.postLikes[i].author === JSON.parse(localStorage.getItem('USER')).id)
        this.thumb.color = 'warn';
    }
    this.db.getProfilePic(this.post.friends[0].username).subscribe(
      data=>this.url=data[0],
      err=>console.error('Profile Pic on Post Error: ',err),
      ()=>this.picStyles["background-image"] = "url('"+this.url+"')"
    );
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
