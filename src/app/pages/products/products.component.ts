import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public response: any;
  constructor(private http: ProductsService) {
    this.response = [];
  }

  ngOnInit(): void {
    this.getTotallyProducts();
  }

  private getTotallyProducts() {
    this.http.getAllProducts().subscribe(
      (response: any) => {
        this.response = response;
        console.log(this.response);
      },
      (error: any) => {
        console.log('Error al pedir datos del server');
      },
      () => {
        console.log('Proceso terminado');
      }
    );
  }
  public getResponse() {
    return this.response;
  }
}
