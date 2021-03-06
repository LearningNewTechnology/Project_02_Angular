import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loggedin: boolean = false;
  public isAccountPage: boolean = false;

  constructor(private authService: AuthService, private router: Router) { /*this.Logout();*/ }

  ngOnInit() {
    this.router.events
      .subscribe(
        (data) => {
          this.loggedin = this.authService.isLoggedIn();
          if (this.router.url === '/account') { this.isAccountPage = true; }
        },
        (err) => console.error(err)
      );
  }

  public Logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
