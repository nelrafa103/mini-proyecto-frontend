import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements AfterViewInit {
  @ViewChild('formmail') emailRef!: ElementRef;
  @ViewChild('formpassword') passwordRef!: ElementRef;
  @ViewChild('formname') nameRef!: ElementRef;

  constructor() {}
  ngAfterViewInit() {}
  //ngOnInit(): void {}

  private Regex() {
    const emailRegex = new RegExp('d');
    const emailValue = this.emailRef.nativeElement.value,
      passwordValue = this.passwordRef.nativeElement.value;
    /*if(){

   }s */
    emailValue.match(emailRegex);
  }

  public Register() {
    fetch('http://127.0.0.1:3000/signup', {
      method: 'POST',
      body: JSON.stringify({
        Email: this.emailRef.nativeElement.value,
        Password: this.passwordRef.nativeElement.value,
        Name: this.nameRef.nativeElement.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {})
      .catch(() => {
        console.log('No se ha podido realizar el registro');
      });
  }
}
