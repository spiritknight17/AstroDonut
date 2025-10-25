import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor, NgForOf, DecimalPipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [NgIf, NgForOf, DecimalPipe, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
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
  @Input() cartItems: any[] = [];
  @Input() totalItems = 0;
  @Output() closeCart = new EventEmitter<void>();
  closeCartPopup(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.closeCart.emit();
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
}
