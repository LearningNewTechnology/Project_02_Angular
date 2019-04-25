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
  public registerGroup: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private router: Router, private _dataService: DatabaseService) { }

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
    //modified by Poho
    //let user: User = JSON.parse(this.registerGroup.value);
    this._dataService.registerNewUser(newUSer)
    .subscribe((response) => {console.log(response)}, (error)=>{
      console.log(error);
    });
    //up to here that Poho changed
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
