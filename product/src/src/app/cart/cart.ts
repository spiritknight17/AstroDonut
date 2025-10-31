import { Component, Input, Output, EventEmitter, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgIf, NgFor, NgForOf, DecimalPipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgForOf, DecimalPipe, RouterModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('cartAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('350ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('350ms ease-in-out', style({ opacity: 0, transform: 'translateY(40px)' }))
      ])
    ])
  ]
})
export class Cart {
  @Input() showCart = false;
  @Input() totalItems: number = 0;
  @Input()cartItems: any[] = []
  @Output() closeCart = new EventEmitter<void>();
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    this.cartService.refreshCart();
  }
  closeCartPopup(event?: Event) {
    if (event) event.stopPropagation();
    this.closeCart.emit();
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  removeItem(item: any) {
    if (item && item.id != null) {
      this.cartService.removeFromCart(item.id);
    }
  }
  clearCart() {
    this.cartService.clearCart();
  }
}
