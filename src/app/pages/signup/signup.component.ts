import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements AfterViewInit {
  @ViewChild('formmail') emailRef!: ElementRef;
  @ViewChild('formpassword') passwordRef!: ElementRef;
  @ViewChild('formname') nameRef!: ElementRef;
  public name: string;
  public email: string;
  public serverMessage: string;
  public password: string;
  constructor(private cookieService: CookieService) {
    this.name = '';
    this.email = '';
    this.serverMessage = '';
    this.password = '';
  }
  ngAfterViewInit() {}
  //ngOnInit(): void {}

  public NameRegex(): boolean {
    const numbersRegex = /1234567890/;
    const specialChaRegex = '/[`~!@#$%^&*()_|+-=?;:,.<>{}[]\\/]';
    const nameValue = this.nameRef.nativeElement.value;
    if (nameValue.match(numbersRegex) != null) {
      return false;
    }
    if (specialChaRegex.match(nameValue) != null) {
      return false;
    }
    return true;
  }
  public EmailRegex(): boolean {
    const emailRegex =
      /^[a-zA-Z.!#$%&’*+/=?^_`{|}~-]+[a-zA-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailValue = this.emailRef.nativeElement.value;
    // Probing the diferent cases
    if (emailValue.match(emailRegex) != null) {
      this.serverMessage = 'Invalid Email';
      return false;
    }
    return true;
  }

  public PassRegex(): boolean {
    const passwordValue = this.passwordRef.nativeElement.value;
    const numbersRegex = /[0-9]/;
    const specialChaRegex = /[`~!@#$%^&*()_|+\-=?;:,.<>\{\}\[\]\\\/]/;
    console.log(passwordValue);
    if (passwordValue.match(numbersRegex) == null) {
      this.serverMessage = 'Numbers needed';
      return false;
    }
    if (passwordValue.match(specialChaRegex) == null) {
      this.serverMessage = 'Special characters needed';
      return false;
    }

    if (passwordValue.length < 8) {
      this.serverMessage = 'The password must need 8 characters';
      return false;
    }
    this.serverMessage = '';
    return true;
  }
  public Register() {
    if (
      this.PassRegex() == true &&
      this.EmailRegex() == true &&
      this.NameRegex() == true
    ) {
      fetch('http://127.0.0.1:3000/signup', {
        method: 'POST',
        body: JSON.stringify({
          Email: this.emailRef.nativeElement.value,
          Name: this.nameRef.nativeElement.value,
          Password: this.passwordRef.nativeElement.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const status = response.Status;
          const body = response.Body;
          if (body == 'Log in approved') {
            location.href = location.origin + '/Home';
            this.SetInCookies(body);
          } else {
            this.serverMessage = status;
          }
          console.log(response);
        })
        .catch((response) => {
          console.log('No se ha podido realizar el registro', response);
        });
    }
  }
  private OnSend() {}

  private getRespond(response: any) {
    switch (response) {
      case '1':

      case '2':

      case '3':

      case '4':
    }
    if (response.status == '') {
    }
  }

  private SetInCookies(user: any) {
    this.cookieService.set('Email', user.email);
  }
}
