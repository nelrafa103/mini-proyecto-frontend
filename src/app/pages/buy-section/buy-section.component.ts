import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../login.service';
@Component({
  selector: 'app-buy-section',
  templateUrl: './buy-section.component.html',
  styleUrls: ['./buy-section.component.css'],
})
export class BuySectionComponent implements AfterViewInit {
  public selectedProducts: any[];
  public product: any;
  public isOnCart: boolean;
  @ViewChild('formbutton') formButton!: ElementRef;
  @ViewChild('counter') formCounter!: ElementRef;
  constructor(
    private cookieService: CookieService,
    private Login: LoginService
  ) {
    this.selectedProducts = [];
    this.product = {
      description: '',
      category: '',
      price: 0,
      title: '',
      bag: '',
      quantity: 0,
    };
    this.isOnCart = false;
  }

  ngAfterViewInit(): void {
    this.Login.CheckLogin();
    //console.log(this.getProductsCount());
    this.getProducts();
  }

  private getProductsCount(): number {
    let productsCount = this.cookieService.get('selected count');
    return Number.parseInt(productsCount);
  }

  getProducts() {
    let productsCount = this.getProductsCount();
    let test: any = this.cookieService.get('ids');
    let filter: any[] = [];
    let t: any;
    let product: any = {};
    let copy: any[] = [];
    test = JSON.parse(test);
    test.ids.forEach((element: number, index: number) => {
      t = this.cookieService.get('bag' + element);
      product = JSON.parse(t);
      filter = test.ids.filter((index: number) => index == element);
      if (copy.indexOf(element) == -1) {
        product.quantity = filter.length;
        product.bag = this.cookieService.get('token');
        console.log(this.cookieService.get('token'))
        this.product.bag = this.cookieService.get('token')
        this.selectedProducts.push(product);
        copy.push(element);
      }
      if (index == 0) {
        this.product.description = product.description;
        this.product.price = product.price;
        this.product.bag = this.cookieService.get('token')
        this.product.title = product.title;
        this.product.category = product.category;
        this.formCounter.nativeElement.value = product.quantity;
      }
    });

    // console.log(this.selectedProducts);
  }

  showDataProduct(
    description: string,
    category: string,
    price: number,
    title: string,
    quantity: number
  ) {
    this.product.description = description;
    this.product.price = price;
    this.product.title = title;
    this.product.category = category;
    this.formCounter.nativeElement.value = quantity;
  }

  buyProducts() {
    fetch('http://127.0.0.1:3000/bag', {
      method: 'POST',
      body: JSON.stringify({
        Action: 'Buying',
        Products: this.selectedProducts,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(location, response);
        this.formButton.nativeElement.innerText = 'Comprar Elementos';
      })
      .catch((response) => {});
  }

  deleteProduct(productId: string): boolean {
    let productToDelete: any = document.getElementById(productId);
    // productToDelete.style.display = 'none';
    let test: any = this.cookieService.get('ids');
    test = JSON.parse(test);
    let index: number = test.ids.indexOf(parseInt(productId));
    test.ids.splice(index, 1);
    this.cookieService.set('ids', JSON.stringify(test));
    console.log(test, productId);
    console.log(test.ids.indexOf(parseInt(productId)));
    if (test.ids.indexOf(parseInt(productId)) == -1) {
      productToDelete.style.display = 'none';
    }
    this.selectedProducts.forEach((element) => {
      if (element.id == parseInt(productId)) {
        element.quantity -= 1;
      }
    });
    return false;
  }

  saveProducts() {
    fetch('http://127.0.0.1:3000/bag', {
      method: 'POST',
      body: JSON.stringify({
        Action: 'Adding',
        Products: this.selectedProducts,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(location, response);
        this.formButton.nativeElement.innerText = 'Comprar Elementos';
        this.isOnCart = true;
      })
      .catch((response) => {});
  }

  cancelBuy(
    description: string,
    category: string,
    price: number,
    title: string,
    bag: string,
    quantity: number,
    id: number
  ) {
    let productToDelete: any = document.getElementById(id.toString());
    let product: any = {
      description: description,
      category: category,
      price: price,
      title: title,
      bag: bag,
      quantity: quantity - 1,
    };
    let deletedOne: any[];
    deletedOne = [];
    deletedOne.push(product);
    fetch('http://127.0.0.1:3000/bag', {
      method: 'POST',
      body: JSON.stringify({
        Action: 'Delete',
        Products: deletedOne,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(location, response);

        let test: any = this.cookieService.get('ids');
        test = JSON.parse(test);
        let index: number = test.ids.indexOf(id);
        test.ids.splice(index, 1);
        this.cookieService.set('ids', JSON.stringify(test));
        if (test.ids.indexOf(id) == -1) {
          productToDelete.style.display = 'none';
        }
         this.selectedProducts.forEach((element) => {
            if (element.id == id) {
              element.quantity -= 1;
            }
          });
        //this.formButton.nativeElement.innerText = "Comprar Elementos"
      })
      .catch((response) => {});
  }
}
