import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../classes/user';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  public editSubmitted: boolean = false;
 public editGroup: FormGroup = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl('')
  });
  
  selectedFile: File = null;
  profileURL: string = null;

  public usernameValid: boolean = true;
  public emailValid: boolean = true;

  constructor(private router: Router, private _db: DatabaseService, private fb: FormBuilder, private _currUser: User) { 
  }


  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this._currUser = JSON.parse(localStorage.getItem('USER'));
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('username', this._currUser.username)
    console.log(fd)
    this._db.uploadProfilePic(fd).subscribe(
      res => {
      this.profileURL = res[0];
      localStorage.setItem('profile_image', this.profileURL);
    });
  }

  ngOnInit() {
    //call the getUserById
    this._currUser = JSON.parse(localStorage.getItem('USER'));
    //let curId : Number = JSON.parse(localStorage.getItem('USER')).id;
    this.editGroup.patchValue(this._currUser);
  }

  Update() {
    this.editSubmitted = true;
   console.log(this.editGroup.valid);
    if (this.editGroup.invalid) {
      return;
    }
    let updateUser = new User();
    updateUser.setAll(
      this.editGroup.value.username,
      this.editGroup.value.password,
      this.editGroup.value.email,
      this.editGroup.value.firstName,
      this.editGroup.value.lastName,
      " ",
      //JSON.parse(localStorage.getItem('USER')).salt,
      JSON.parse(localStorage.getItem('USER')).id
    );
    this.editGroup = this.fb.group(
      {
        email: [updateUser.email],//this._currUser.Email],  // call email getter
        username: [updateUser.username], // call username getter
        firstName: [updateUser.firstName], //call first_name_name getter
        lastName: [updateUser.lastName], // call last_name getter
       password: [updateUser.password]
       
      }
      );
    this._currUser = updateUser;
    let msg: any;
      this._db.updateUser(this._currUser).subscribe(
      data=> msg = data,
      err=>console.error('Error occured: ', err),
      ()=>{
        if (msg.status === 0) {
          this.emailValid = true;
          this.usernameValid = true;
          console.log('message status: ', msg.status);
          console.log('submit success');
          alert('Profile Updated Successfully!');
          this.editSubmitted = false;
          localStorage.setItem('USER', JSON.stringify(this._currUser));
        } else if (msg.status === 2) {
          this.emailValid = false;
          console.log('emailValid: ', this.emailValid);
        } else if (msg.status === 7) {
          this.usernameValid = false;
          console.log('usernameValid: ', this.usernameValid);
        }
      }
      );   
  }

  emailChange() {
    this.emailValid = true;
  }

  usernameChange() {
    this.usernameValid = true;
  }
}
