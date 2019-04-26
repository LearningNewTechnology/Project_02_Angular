import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  public editSubmitted: boolean = false;
  public editGroup: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl('')
  });

  public data: Object = {
  
  }

  constructor(private router: Router, private _db: DatabaseService, fb: FormBuilder, private _currUser: User) { 
   //call the getUserById
   this._currUser = JSON.parse(localStorage.getItem('USER'));
   
    //this is from a tutorial, they put this in the constructor, don't know why
    this.editGroup = fb.group({
      first_name: [_currUser.first_name], //call first_name getter
      last_name: [_currUser.last_name], // call last_name getter
      email: [_currUser.email],  // call email getter
      username: [_currUser.username] // call username getter
    });

  }

  ngOnInit() {
  }

  Update() {
    console.log(this.editGroup.valid);
    if (this.editGroup.invalid) {
      return;
    }

    this._currUser.first_name = this.editGroup.value.first_name; // call setter for first_name
    this._currUser.last_name = this.editGroup.value.last_name;// call setter for last_name
    this._currUser.email = this.editGroup.value.email;// call setter for email
    this._currUser.username = this.editGroup.value.username;// call setter for username

    this._db.updateUser(this._currUser).subscribe(
      data=>console.log(data),
      err=>console.error('Error occured: ', err),
      ()=>console.log('Profile ubdated successfully.')
      );
  }

  Cancel(){
    this.router.navigateByUrl('account');
  }

}
