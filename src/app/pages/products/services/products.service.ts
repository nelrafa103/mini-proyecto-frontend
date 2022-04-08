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
    return this.http.get(this.apiUrl + '/category/jewelery');
  }

  getNProducts(n: string) {
    return this.http.get(this.apiUrl + `?limit=` + { n });
  }
}
