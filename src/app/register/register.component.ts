import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public requestSubmitted: boolean = false;
  public registerGroup: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  Register() {
    this.requestSubmitted = true;
    console.log(this.registerGroup.valid);
    if(this.registerGroup.invalid){
      return;
    }
    let newUSer: String = JSON.stringify(this.registerGroup.value);
    
    console.log(newUSer);
  }

}
