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
  public loginGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
                                                                                            //_dataService added by Poho
  constructor(private authService: AuthService, private user: User, private router: Router, private _dataService: DatabaseService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('account');
    }
  }

  public Login() {
    // Added by Poho
    let newUSer: String = JSON.stringify(this.loginGroup.value);
    this._dataService.loginValidation(newUSer)
    .subscribe((response) => {console.log(response)}, (error)=>{
      console.log(error);
    });
    // up to here

    this.loginSubmitted = true;
    if (this.loginGroup.invalid) {
      return;
    }
    this.user.username = this.loginGroup.value['username'];
    this.user.password = this.loginGroup.value['password'];
    this.user.id = 100;
    this.user.accessKey = "User";

    console.log('Login user: ', this.user);

    this.authService.login(this.user);
    this.router.navigateByUrl('account');
  }

}
