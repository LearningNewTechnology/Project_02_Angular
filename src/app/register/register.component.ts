import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public requestSubmitted: boolean = false;
  public pwdMatch: boolean = true;
  public registerGroup: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private router: Router) { }

  ngOnInit() {

    //this.router.navigateByUrl('login');

  }

  Register() {
    this.requestSubmitted = this.pwdMatch = true;
    console.log(this.registerGroup.valid);
    if (this.registerGroup.invalid) {
      return;
    }

    this.pwdMatch = this.checkPasswords(this.registerGroup);
    if (!this.pwdMatch) { return; }

    let newUSer: String = JSON.stringify(this.registerGroup.value);

    console.log(newUSer);
    this.Cancel();
  }

  public Cancel() {
    this.router.navigateByUrl('login');
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirm = group.controls.confirmPassword.value;

    return pass === confirm;
  }

}
