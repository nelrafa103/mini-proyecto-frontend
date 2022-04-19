import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = 'https://fakestoreapi.com/products';
  }

  getAllProducts(): any {
    // this.getNProducts(5)
    return this.http.get(this.apiUrl);
  }

  getNProducts(n: string) {
    return this.http.get(this.apiUrl + '?limit=' + { n });
  }
  getJewelry(): any {
    return this.http.get(this.apiUrl + '/category/jewelery');
  }
  getMensCloth() {
    return this.http.get(this.apiUrl + "/category/men's clothing");
  }
  getWomensCloth() {
    return this.http.get(this.apiUrl + "/category/women's clothing");
  }
}
