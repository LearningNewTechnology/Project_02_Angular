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
    this.requestSubmitted = true;
    console.log(this.registerGroup.valid);
    if(this.registerGroup.invalid){
      return;
    }
    let newUSer: String = JSON.stringify(this.registerGroup.value);
    
    console.log(newUSer);
    this.router.navigateByUrl('login');
    
  }

}
