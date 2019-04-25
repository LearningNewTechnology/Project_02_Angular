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

  constructor(private router: Router, private _db: DatabaseService, fb: FormBuilder) { 
    //this is from a tutorial, they put this in the constructor, don't know why
    this.editGroup = fb.group({
      first_name: [], //call first_name getter
      last_name: [], // call last_name getter
      email: [],  // call email getter
      username: [] // call username getter
    });
  }

  ngOnInit() {
  }

  Update(){
    console.log(this.editGroup.valid);
    if (this.editGroup.invalid) {
      return;
    }

    // call setter for first_name
    // call setter for last_name
    // call setter for email
    // call setter for username
  }

  Cancel(){
    this.router.navigateByUrl('account');
  }

}
