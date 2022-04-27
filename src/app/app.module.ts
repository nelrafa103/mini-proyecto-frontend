import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IntroComponent } from './intro/intro.component';
import { AdvertComponent } from './advert/advert.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './pages/account/account.component';
import { BuySectionComponent } from './pages/buy-section/buy-section.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IntroComponent,
    AdvertComponent,
    FooterComponent,
    ProductsComponent,
    HomeComponent,
    AboutComponent,
    SignupComponent,
    AccountComponent,
    BuySectionComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
