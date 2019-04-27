import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user'; //modified by Poho
import { DatabaseService } from '../database.service'; //modified by Poho

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public requestSubmitted: boolean = false;
  public pwdMatch: boolean = true;

  //new things added
  public usernameValid: boolean = true;
  public emailValid: boolean = true;
  //up to here

  public registerGroup: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private router: Router, private db: DatabaseService) { }

  ngOnInit() {

  }

  Register() {
    this.requestSubmitted = this.pwdMatch = true;
    console.log('Reg Group Valid?: ',this.registerGroup.valid);
    if (this.registerGroup.invalid) {
      return;
    }

    this.pwdMatch = this.checkPasswords(this.registerGroup);
    if (!this.pwdMatch) { return; }

    let registerUser: User = new User();
    registerUser.setAll(
      this.registerGroup.value['username'],
      this.registerGroup.value['password'],
      this.registerGroup.value['email'],
      this.registerGroup.value['firstName'],
      this.registerGroup.value['lastName']
    );

    let msg: any;
    this.db.registerNewUser(registerUser)
      .subscribe(
        data => msg = data, //original this is not commented out
        error => console.error(error),
        () => {
          if (msg.status === 0) {
            this.emailValid = true;
            this.usernameValid = true;
            console.log('message status: ', msg.status);
            console.log('submit success');
            this.Cancel();
          } else if (msg.status === 2) {
            //console.log('Register Component User: ',registerUser);
            this.emailValid = false;
            console.log('emailValid: ', this.emailValid);
          } else if (msg.status === 7) {
            this.usernameValid = false;
            console.log('usernameValid: ', this.usernameValid);
          }
        }
      );
  } //end of Register method

  public Cancel() {
    this.router.navigateByUrl('login');
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirm = group.controls.confirmPassword.value;

    return pass === confirm;
  }

  emailChange() {
    this.emailValid = true;
  }

  usernameChange() {
    this.usernameValid = true;
  }

}
