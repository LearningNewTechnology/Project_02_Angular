import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public profilePicUrl: string = 'assets/img/RainbowPls.gif';
  public user: User;
  public edit: boolean = false;

  constructor(private authService: AuthService, private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
    this.user = JSON.parse(localStorage.getItem('USER'));
    console.log("Account Component USer: ", this.user);
  }

  public toggleEdit(): void {
    this.edit = !this.edit;
  }

}
