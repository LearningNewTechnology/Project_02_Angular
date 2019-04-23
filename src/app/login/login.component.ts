import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ɵangular_packages_forms_forms_w } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginSubmitted: boolean = false;
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

    let userData: any;


    this.db.getUserByUsername(formUsr).subscribe(
      (data) => {
        userData = data;
      },
      (err) => console.error('Error occured: ', err),
      () => console.log('DB Response: ',userData)
    );

    console.log('Login user: ', { 'username': formUsr, 'password': formPwd });
    this.authService.login(this.user);
    //this.router.navigateByUrl('account');
  }

}
