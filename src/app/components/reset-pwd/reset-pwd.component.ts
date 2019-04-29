import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../classes/user';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  public requestSubmitted: boolean = false;
  public showEmailGroup: boolean = true;
  public showKeyGroup: boolean = false;
  public showResetGroup: boolean = false;

  public emailGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('')
  });

  public resetKeyGroup: FormGroup = new FormGroup({
    resetCode: new FormControl('')
  });

  public resetPwdGroup: FormGroup = new FormGroup({
    newPwd: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  private resetUser: any;

  constructor(private authService: AuthService, private user: User, private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    this.showEmailGroup = true;
    this.showKeyGroup = false;
    this.showResetGroup = false;
  }

  ResetPwd(): void {
    this.requestSubmitted = true;
    let _currUser: User = new User();
    _currUser = this.resetUser;
    if (this.resetPwdGroup.invalid) {
      return;
    }
    let msg: any;
    let pwd: string = this.resetPwdGroup.value.newPwd;
    _currUser.password = pwd;
    this.db.updateUser(_currUser).subscribe(
      data => msg = data,
      err => console.error('Error Occurred: ', err),
      () => {
        if (msg.status === 0) {
          alert('Password Updated Successfully!');
          this.router.navigateByUrl('login');
        }
      }
    );

    this.router.navigateByUrl('login');
  }

  public SendEmail() {
    let user: any;
    if (this.emailGroup.value['username'] === null) { return; } else {
      this.db.getUserByUsername(this.emailGroup.value['username']).subscribe(
        data => user = data,
        err => console.error(err),
        () => {
          this.db.sendEmail(user).subscribe(
            data => { },
            err => console.error(err)
          );

        }
      );
    }
    this.showKeyGroup = true;
    this.showEmailGroup = false;
  }
  public ValidateCode() {
    let user: any;
    this.db.validateCode(this.resetKeyGroup.value['resetCode']).subscribe(
      data => user = data,
      err => console.error(err),
      () => {
        this.resetUser = user;
        this.showResetGroup = true;
        this.showKeyGroup = false;
      }
    );

  }


  public Cancel() {
    this.router.navigateByUrl('login');
  }


}
