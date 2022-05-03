import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('formmail') emailRef!: ElementRef;
  private user: any;
  public LoginMessage: string;
  @ViewChild('formpassword') passwordRef!: ElementRef;
  constructor(private cookieService: CookieService) {
    this.LoginMessage = '';
  }

  ngAfterViewInit() {
    console.log(this.emailRef);
  }

  public Auth() {
    fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        Email: this.emailRef.nativeElement.value,
        Password: this.passwordRef.nativeElement.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        this.user = response.Body;
        this.LoginMessage = response.Status;
        if (this.LoginMessage == 'Log in approved') {
          location.href = location.origin + '/Home';
          //this.SetInCookies(this.user);
          this.cookieService.set('token',response.Token)
        }
      })
      .catch((response) => {
        this.LoginMessage = 'Invalid logIn';
      });
  }
  public changeName() {}
  public changePassword() {}
  public changeEmail() {}
  private SetInCookies(user: any) {
    this.user = user;
    this.cookieService.set('Email', user.email);
  }
}
