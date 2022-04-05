import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts() {
      /* Necesito utilizar http client para completar esto*/
        
     /*  let respond = fetch(`https://fakestoreapi.com/products?limit=5`)
      .then((res) => res.json())
      .then((json) => {return json})
      .catch(() => console.log("It take to long")); 
   
 */
  } 
}
