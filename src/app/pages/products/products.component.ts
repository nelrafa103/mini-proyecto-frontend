import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ProductsService } from './services/products.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../login.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements AfterViewInit {
  public response: any;
  private productInfo: any;
  private SelectedProducts: any[];
  private idSelectedProd: any;
  @ViewChild('categorizer') categorizer!: ElementRef;
  constructor(
    private http: ProductsService,
    private cookieService: CookieService
  ) {
    this.response = [];
    this.SelectedProducts = [];
    this.idSelectedProd = {
      ids: [],
    };
    this.productInfo = {};
  }

  private getTotallyProducts() {
    this.http.getAllProducts().subscribe(
      (response: any) => {
        this.response = response;
      },
      (error: any) => {
        console.log('Error al pedir datos del server');
      },
      () => {
        console.log('Proceso terminado');
      }
    );
  }

  public getJewelry() {
    this.http.getJewelry().subscribe(
      (response: any) => {
        this.response = response;
      },
      (error: any) => {
        console.log('Error al pedir datos del server');
      },
      () => {
        console.log('Proceso terminado');
      }
    );
  }
  public getMensCloth() {
    this.http.getMensCloth().subscribe(
      (response: any) => {
        this.response = response;
      },
      (error: any) => {
        console.log('Error al pedir datos del server');
      },
      () => {
        console.log('Proceso terminado');
      }
    );
  }

  public getWomensCloth() {
    this.http.getWomensCloth().subscribe(
      (response: any) => {
        this.response = response;
        this.listProduct();
        console.log(this.productInfo);
      },
      (error: any) => {
        console.log('Error al pedir datos del server');
      },
      () => {
        console.log('Proceso terminado');
      }
    );
  }
  ngAfterViewInit() {
    // Search for data saved here in produdcts ids selected
    this.idSelectedProd = JSON.parse(this.cookieService.get('ids'));
    this.getTotallyProducts();
  }
  public ShowSelected() {
    switch (this.categorizer.nativeElement.value) {
      case 'jewelry':
        this.getJewelry();
        break;
      case 'All':
        this.getTotallyProducts();
        break;
      case 'mensCloth':
        this.getMensCloth();
        break;
      case 'womensCloth':
        this.getWomensCloth();
        break;
      default:
        break;
    }
  }
  addProduct(id: number) {
    this.SelectedProducts.push(this.response[id]);
    this.idSelectedProd['ids'].push(id);
    this.cookieService.set(
      'bag' + id.toString(),
      JSON.stringify(this.response[id])
    );
    this.cookieService.set('ids', JSON.stringify(this.idSelectedProd));
    this.setCount();
  }

  private listProduct() {
    this.response.forEach((element: any) => {
      this.productInfo[element.id] = {
        title: element.title,
        description: element.description,
        price: element.price,
        category: element.category,
        image: element.image,
      };
    });
  }
  private setCount() {
    this.cookieService.set(
      'selected count',
      this.SelectedProducts.length.toString()
    );
  }
}
