import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor() {
     var l = new ProductsService()
    console.log(l.getProducts())
  }

  ngOnInit(): void {
   

  }
}