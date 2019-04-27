import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginSubmitted: boolean = false;
  public userNotFound: boolean = false;
  public passwordNotFound: boolean = false;
  public loginGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private user: User, private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('account');
    }
  }

  public Login() {
    this.loginSubmitted = true;
    if (this.loginGroup.invalid) {
      return;
    }

    let userData: User = new User();

    this.db.getUserByUsername(this.loginGroup.value['username']).subscribe(
      (data) => {
        userData.setAll(data['username'], this.loginGroup.value['password'], data['email'], data['firstName'], data['lastName'], data['id'], data['access_key'])
      },
      (err) => console.error('Error occured: ', err),
      () => {
        if (userData.Id === 0) { this.userNotFound = true; }
        if (this.loginGroup.value['username'] != userData['username']) {
          this.userNotFound = true;
        }
        else {
          let msg: any;
          this.db.checkLogin(userData).subscribe(
            data => msg = data,
            err => console.error('Login err: ', err),
            () => {
              if (msg.status === 0) {
                console.log('Login Component User: ',userData);
                this.authService.login(userData);
                this.router.navigateByUrl('account');
              }
              else { this.passwordNotFound = true; }
            }
          );
        }
      }
    );
  }

}
