import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { OrderItemService } from '../service/order-item.service';
import { OrderItem } from '../model/orderItem';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Menu {
  public products: (Product & { quantity: number; computedPrice: number })[] = [];
  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    console.log("ngOnInit called");
    this.productService.getData().subscribe((data: Product[]) => {this.products = data.map((p: Product) => ({...p, quantity: 0, computedPrice: 0 }));});
  }
  increaseQuantity(prod: any) {
    prod.quantity = (prod.quantity || 0) + 1;
    prod.computedPrice = prod.price * prod.quantity;
  }
  decreaseQuantity(prod: any) {
    if (prod.quantity && prod.quantity > 0) {
      prod.quantity -= 1;
      prod.computedPrice = prod.price * prod.quantity;
    }
  }
  getTotalPrice(product: Product & { quantity: number }): number{
    return product.price * product.quantity;
  }
  addtoCart(prod: any) {
    if (prod.quantity <= 0) {
      alert('Please select a quantity before adding to cart.');
      return;
    }
    const cartItem = new OrderItem();
    cartItem.productId = prod.id;
    cartItem.productName = prod.name;
    cartItem.productDescription = prod.description || '';
    cartItem.productImageFile = prod.imageFile;
    cartItem.productUnitOfMeasure = prod.unitOfMeasure || 'each';
    cartItem.quantity = prod.quantity;
    cartItem.price = prod.price;
    cartItem.status = 'Created';
    
    this.cartService.addToCart(cartItem);
    alert(`${prod.name} added to cart!`);
    prod.quantity = 0;
  }
}
