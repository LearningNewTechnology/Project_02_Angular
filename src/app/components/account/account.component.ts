import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Post } from '../../classes/post';
import { User } from '../../classes/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public profilePicUrl: string = localStorage.getItem('profile_image');
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

    if (localStorage.getItem('profile_image')) {
      this.profilePicUrl = localStorage.getItem('profile_image');
    } else {
      this.db.getProfilePic(this.user.username).subscribe(
        res => {
          this.profilePicUrl = res[0];
        },
        err => console.error('Profile pic error: ', err),
        () => { localStorage.setItem('profile_image', this.profilePicUrl); }
      );
    }

  }

  public toggleEdit(): void {
    this.edit = !this.edit;
  }

  public Post() {
    if (this.postGroup.invalid) { return; }
    let post: Post = new Post();

    post.description = this.postGroup.value['postText'];
    post.friends.push(this.user);

    this.db.createNewPost(post).subscribe(
      data => { },
      err => console.error(err),
      () => {
        this.postGroup = new FormGroup({
          postText: new FormControl('')
        });
      }
    );
  }

}
