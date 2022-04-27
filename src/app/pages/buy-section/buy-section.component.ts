import { Component, OnInit,  ViewChild,
  ElementRef,
  AfterViewInit, } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {LoginService} from '../../login.service'
@Component({
  selector: 'app-buy-section',
  templateUrl: './buy-section.component.html',
  styleUrls: ['./buy-section.component.css'],
})
export class BuySectionComponent implements AfterViewInit {
  public selectedProducts: any[];
  public product: any;
  @ViewChild('formbutton') formButton!: ElementRef;
  constructor(private cookieService: CookieService, private Login: LoginService) {
    this.selectedProducts = [];
    this.product = {
      description: '',
      category: '',
      price: 0,
      title: '',
      quantity: 0,
    };
  }

  ngAfterViewInit(): void {
    this.Login.CheckLogin()
    console.log(this.getProductsCount());
    this.getProducts();
  }

  private getProductsCount(): number {
    let productsCount = this.cookieService.get('selected count');
    return Number.parseInt(productsCount);
  }

  getProducts() {
    let productsCount = this.getProductsCount();
    let test: any = this.cookieService.get('ids');
    let unfilter: any[] = []
    test = JSON.parse(test);
    test.ids.forEach((element: any) => {
      this.selectedProducts.push(
        JSON.parse(this.cookieService.get('bag' + element))
      );
    });
    console.log(this.selectedProducts);
  }

  showDataProduct(
    description: string,
    category: string,
    price: number,
    title: string
  ) {
    this.product.description = description;
    this.product.price = price;
    this.product.title = title;
    this.product.category = category;
  }

  addToCart() {
    
  }
  deleteProduct(productId: string): boolean {
    let productToDelete:any = document.getElementById(productId)
    this.cookieService.delete('bag' + productId)
    let counter: number
    this.selectedProducts.forEach((element:any) => {
       /* if(element.id = productId) {
           selectedProducts[counter]
        } */
    })
    productToDelete.style.display = "none"
    return false
  }

  saveProducts() {
     fetch('http://127.0.0.1:3000/bag', {
      method: 'POST',
      body: JSON.stringify({
       Products: this.selectedProducts 
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(location)
      })
      .catch((response) => {
        
      });
  }

}
