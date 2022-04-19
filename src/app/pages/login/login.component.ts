import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('formmail') emailRef!: ElementRef;
  @ViewChild('formpassword') passwordRef!: ElementRef;
  constructor() {}

  ngAfterViewInit() {
    console.log(this.emailRef);
  }

  public Auth() {
    console.log('Authenticating..');
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
        /*console.log(response)
        console.log(this.emailRef,this.passwordRef)*/
      })
      .catch(() => {
        console.log('No se ha podido realizar el logIn');
      });
  }
}
