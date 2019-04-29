import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';

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
    let saltedPwd: string = '';

    this.db.getUserByUsername(this.loginGroup.value['username']).subscribe(
      (data) => {
        userData.setAll(data['username'], this.loginGroup.value['password'], data['email'], data['firstName'], data['lastName'], data['salt'], data['id'], data['access_key'])
        saltedPwd = data['password'];
      },
      (err) => console.error('Error occured: ', err),
      () => {
        if (userData.id === 0) { this.userNotFound = true; }
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
                userData.password = saltedPwd;
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
