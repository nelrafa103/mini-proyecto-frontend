import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private cookieService: CookieService) {
    // LoginService.counter = LoginService.counter
  }
  CheckLogin(): boolean {
    console.log(this.cookieService.check('token'));
    if (this.cookieService.check('token') == false) {
      location.href = location.origin + '/Login';
    }
    return false;
  }

  LogOut() {
    this.cookieService.delete('token');
    this.cookieService.delete('Email');
  }
}
