import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ProductsService } from './services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements AfterViewInit {
  public response: any;
  @ViewChild('categorizer') categorizer!: ElementRef;
  constructor(private http: ProductsService) {
    this.response = [];
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
}
