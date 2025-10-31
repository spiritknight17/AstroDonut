import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { OrderItemService } from "./order-item.service";
import { OrderItem } from "../model/orderItem";
@Injectable({
  providedIn: 'root'
})
export class CartService {
    private cartItems: OrderItem[] = [];
    private cartItemsSubject = new BehaviorSubject<OrderItem[]>([]);
    cartItems$ = this.cartItemsSubject.asObservable();
    constructor(private orderItemService: OrderItemService) {}

    refreshCart() {
        this.orderItemService.getAllOrderItems().subscribe({
            next: (items) => {
                this.cartItems = items;
                this.cartItemsSubject.next(this.cartItems);
            },
            error: (err) => {
                console.error('Failed to load cart items', err);
            }
        });
    }

    addToCart(item: OrderItem) {
        this.orderItemService.addOrderItem(item).subscribe({
            next: () => {
                this.refreshCart();
            },
            error: (err) => {
                console.error('Failed to add item to cart', err);
            }
        });
    }

    removeFromCart(id: number) {
        this.orderItemService.deleteOrderItem(id).subscribe({
            next: () => {
                this.refreshCart();
            },
            error: (err) => {
                console.error('Failed to remove item from cart', err);
            }
        });
    }

    clearCart() {
        this.orderItemService.clearOrderItems().subscribe({
            next: () => {
                this.refreshCart();
            },
            error: (err) => {
                console.error('Failed to clear cart', err);
            }
        });
    }

    getCartItems() {
        return this.cartItems;
    }

    getTotalPrice() {
        return this.cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
    }
}