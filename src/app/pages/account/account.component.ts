import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {LoginService} from '../../login.service'
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements AfterViewInit {
  public Message: string;
  public User = {
    Name: '',
    Email: '',
    Password: '',
  };
  private Email: string;
  @ViewChild('formmail') emailRef!: ElementRef;

  constructor(private cookieService: CookieService,private Login:LoginService) {
    this.Message = '';
    this.Email = '';
  }

  ngAfterViewInit(): void {
    this.getUserData();
    this.Login.CheckLogin()
    this.Email = this.cookieService.get('Email');
    this.getUserData();
    // console.log(this.Email)
  }

  getUserData(): void {
    fetch('http://127.0.0.1:3000/account', {
      method: 'POST',
      body: JSON.stringify({
        Email: this.Email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.Message = 'Something goes wrong';
        this.User.Name = response.name;
        this.User.Email = response.email;
        this.User.Password = response.password;
      })
      .catch((response) => {
        this.Message = 'Invalid';
      });
  }
}
