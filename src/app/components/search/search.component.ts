import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public results: any;
  public noResults: boolean = false;
  public searchGroup: FormGroup = new FormGroup({
    param: new FormControl('')
  });

  constructor(private db: DatabaseService) { }

  ngOnInit() {
  }

  Search() {
    this.noResults = false;
    if (this.searchGroup.invalid) { return; }

    this.db.searchUsername(this.searchGroup.value['param']).subscribe(
      data => this.results = data,
      err => console.error(err),
      () => {
        if (this.results.length < 1) { this.noResults = true; }
        this.searchGroup = new FormGroup({
          param: new FormControl('')
        });
      }
    );
  }

}
