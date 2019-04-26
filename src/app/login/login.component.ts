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
  public usernamesMatch: boolean = true;
  public passwordsMatch: boolean = true;
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
    let formUsr = this.loginGroup.value['username'];
    let formPwd = this.loginGroup.value['password'];

    let userData: User = new User();


    this.db.getUserByUsername(formUsr).subscribe(
      (data) => {
        userData.setAll(data['username'], data['password'], data['email'], data['firstName'], data['lastName'], data['id'], data['access_key'])
      },
      (err) => console.error('Error occured: ', err),
      () => {
        if (formUsr != userData['username']) {
          this.usernamesMatch = false;
        }
        else {

        }
        this.authService.login(userData);
        this.router.navigateByUrl('account');
      }
    );
  }

}
