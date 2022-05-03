import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isActive: boolean;
  public isDisplayed: boolean;
  public isLogged: boolean;
  private cookieValue: any;
  constructor(
    private cookieService: CookieService,
    private Login: LoginService
  ) {
    this.isActive = false;
    this.isLogged = false;
    this.isDisplayed = false;
  }

  ngOnInit(): void {
    this.cookieValue = this.cookieService.check('token');

    this.CheckEmail();
  }

  OpenMenu() {
    if (this.isActive == false) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  private CheckEmail() {
    if (this.cookieValue == false) {
      this.isLogged = true;
    }
  }

  displayOptions() {
    if (this.isDisplayed == false) {
      this.isDisplayed = true;
    } else {
      this.isDisplayed = false;
    }
  }
  private getProductCount() {
    this.cookieService.get('products count');
  }

  public closeSession() {
    this.Login.LogOut();
  }
}
