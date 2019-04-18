import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loggedin: boolean;

  constructor(private authService: AuthService, private router: Router) { /*this.Logout();*/ }

  ngOnInit() {
    this.router.events
      .subscribe(
        (data) => {
          this.loggedin = this.authService.isLoggedIn();
        });
  }

  public Logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
