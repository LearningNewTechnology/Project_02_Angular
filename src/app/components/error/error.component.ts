import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  private prevUrl: string;

  constructor() { }

  ngOnInit() {
  }

  public Back() {
    window.history.back();
  }

}
