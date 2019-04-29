import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/classes/user';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() public user: User;
  public picStyles = {
    'background-image': "url('')",
    'background-size': 'cover'
  };

  private url: string;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getProfilePic(this.user.username).subscribe(
      data => this.url = data[0],
      err => console.error('Profile Pic on Post Error: ', err),
      () => this.picStyles["background-image"] = "url('" + this.url + "')"
    );
  }

}
