import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { User } from '../user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  
  selectedFile: File = null;
  profileURL: String = null;

  

  constructor(private router: Router, private _db: DatabaseService, private fb: FormBuilder, private _currUser: User, private http: HttpClient) { 
  }


  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this._currUser = JSON.parse(localStorage.getItem('USER'));
    console.log(this._currUser.Username);
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('username', 'jonsnow12')
    console.log(fd)
    this.http.post('http://localhost:8080/FaceYourBookSpace/profile_image/upload', fd).subscribe(res => {
      this.profileURL = res[0];
      console.log(this.profileURL);
    });
  }

  ngOnInit() {
     //call the getUserById
   this._currUser = JSON.parse(localStorage.getItem('USER'));
        //this is from a tutorial, they put this in the constructor, don't know why
        this.editGroup = this.fb.group({
          first_name: [this._currUser.First_name], //call first_name getter
          last_name: [this._currUser.Last_name], // call last_name getter
          email: [this._currUser.Email],  // call email getter
          username: [this._currUser.Username] // call username getter
        });

      
  }

  Update() {
    console.log(this.editGroup.valid);
    if (this.editGroup.invalid) {
      return;
    }

    this._currUser.First_name = this.editGroup.value.first_name; // call setter for first_name
    this._currUser.Last_name = this.editGroup.value.last_name;// call setter for last_name
    this._currUser.Email = this.editGroup.value.email;// call setter for email
    this._currUser.Username = this.editGroup.value.username;// call setter for username

    this._db.updateUser(this._currUser).subscribe(
      data=>console.log(data),
      err=>console.error('Error occured: ', err),
      ()=>console.log('Profile updated successfully.')
      );
  }
}
