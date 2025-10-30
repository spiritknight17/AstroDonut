import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Menu {
  public products: (Product & { quantity: number })[] = [];
  constructor(private productService: ProductService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    console.log("ngOnInit called");
    this.productService.getData().subscribe((data: Product[]) => {this.products = data.map((p: Product) => ({...p, quantity: 0}));});
  }
  increaseQuantity(product: Product & {quantity: number}): void {
    product.quantity += 1;
  }
  decreaseQuantity(product: Product & { quantity: number }): void{
    if (product.quantity > 0) {
      product.quantity --;
    }
  }
  getTotalPrice(product: Product & { quantity: number }): number{
    return product.price * product.quantity;
  }
}
