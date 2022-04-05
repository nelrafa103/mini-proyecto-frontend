import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
 
  constructor(private http: ProductsService) {
   
  }

  ngOnInit(): void {
    console.log("En ngOnInit metodo")
    // this.getTotallyProducts()
  }

  public getTotallyProducts(){
    this.http.getAllProducts().subscribe(
       (response:any) => {
        console.log(response)
       },
       (error:any) => {
        console.log("Error al pedir datos del server")
       },
       () => {
        console.log("Proceso terminado")
       }
      )
    
  }
}
