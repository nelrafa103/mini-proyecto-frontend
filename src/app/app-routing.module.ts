import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SignupComponent } from './pages/signup/signup.component';
const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'SignUp', component: SignupComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Products', component: ProductsComponent },
  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
