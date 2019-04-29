import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../classes/user';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public requestSubmitted: boolean = false;
  public pwdMatch: boolean = true;

  public usernameValid: boolean = true;
  public emailValid: boolean = true;

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

            this.Cancel();
          } else if (msg.status === 2) {
            this.emailValid = false;

          } else if (msg.status === 7) {
            this.usernameValid = false;
          }
        }
      );
  } 

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
