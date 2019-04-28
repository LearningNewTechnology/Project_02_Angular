import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { DatabaseService } from '../database.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from '../post';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public profilePicUrl: string = 'assets/img/RainbowPls.gif';
  public user: User;
  public edit: boolean = false;
  public postSubmitted: boolean = false;
  public postGroup: FormGroup = new FormGroup({
    postText: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
    this.user = JSON.parse(localStorage.getItem('USER'));
    console.log(this.user);
  }

  public toggleEdit(): void {
    this.edit = !this.edit;
  }

  public Post() {
    if (this.postGroup.invalid) { return; }
    let post: Post = new Post();

    post.description = this.postGroup.value['postText'];
    post.friends.push(this.user);

    console.log(post);

    this.db.createNewPost(post).subscribe(
      data => console.log(data),
      err => console.error(err),
      () => {
        this.postGroup = new FormGroup({
          postText: new FormControl('')
        });
      }
    );
  }

}
