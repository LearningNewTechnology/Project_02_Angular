import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  public requestSubmitted: boolean = false;
  public resetPwdGroup: FormGroup = new FormGroup({
    newPwd: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ResetPwd(): void {
    this.requestSubmitted = true;
    console.log(this.resetPwdGroup.valid);
    if (this.resetPwdGroup.invalid) {
      return;
    }
    let pwd: String = this.resetPwdGroup.value.newPwd;

    console.log(pwd);
    this.router.navigateByUrl('login');
  }

  public Cancel() {
    this.router.navigateByUrl('login');
  }

}
