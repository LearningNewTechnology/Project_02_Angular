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

  constructor(private authService: AuthService, private user: User, private router: Router, private db: DatabaseService) { }

  ngOnInit() {
  }

  ResetPwd(user): void {
    this.requestSubmitted = true;
    if (this.resetPwdGroup.invalid) {
      return;
    }
    let msg: any;
    let pwd: String = this.resetPwdGroup.value.newPwd;
    user.password = pwd;
    this.db.updateUser(user).subscribe(
      data=> msg = data,
      err=> console.error('Error Occurred: ', err),
      () => {
        if(msg.status === 0){
          alert('Password Updated Successfully!');
        }
      }
    );
    
      //update password here
    console.log(pwd);

    this.router.navigateByUrl('login');
  }

  public SendEmail() {
    let user: any;
    if (this.emailGroup.value['username'] === null) { return; } else {
      this.db.getUserByUsername(this.emailGroup.value['username']).subscribe(
        data => user = data,
        err => console.error(err),
        () => {
          console.log(user);
          this.db.sendEmail(user).subscribe(
            data => console.log(data),
            err => console.error(err)
          );
          
        }
      );
    }
    this.showKeyGroup = true;
  }
  public ValidateCode(){
    let user: any;
    this.db.validateCode(this.resetKeyGroup.value['input']).subscribe(
      data=> user,
      err => console.error(err),
      () => console.log(user)
    );
    localStorage.setItem('USER', JSON.stringify(user));
    this.showResetGroup = true;
  }


  public Cancel() {
    this.router.navigateByUrl('login');
  }


}
