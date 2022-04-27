import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private cookieService: CookieService) {}
  private cookieValue: any;
  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('Email');
    console.log(this.cookieValue);
  }
}
