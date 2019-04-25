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

  constructor(private authService: AuthService, private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
    let user: User = JSON.parse(localStorage.getItem('USER'));
    // console.log('Account user: ', user);
    this.db.getAllUsers().subscribe(
      data => console.log(data),
      err => console.error(err)
    );
  }

}
