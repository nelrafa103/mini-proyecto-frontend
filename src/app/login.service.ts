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
    console.log(this.cookieService.check("Email"))
    if(this.cookieService.check("Email") == false){
      location.href = location.origin + '/Login'
    } 
    return false;
  }

   LogOut() {
   this.cookieService.delete("Email")
  }
}
