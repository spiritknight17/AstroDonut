import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Cart } from "../cart/cart";

@Component({
  selector: 'app-header',
  imports: [RouterModule, Cart],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  showCart = false;
  cartItems: any[] = [];
  totalItems = 0;
  constructor(private router: Router) {}
  toggleCartPopup() {
    this.showCart = !this.showCart;
  }
  closeCartPopup() {
    this.showCart = false;
  }
  goToDeals() {
    this.router.navigate(['/'], { fragment: 'deals' }).then(() => {
      const element = document.getElementById('deals');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start'});
      }
    });
  }
  goToHome() {
    this.router.navigate(['/'], { fragment: 'home-page' }).then(() => {
      const element = document.getElementById('home-page');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start'});
      }
    });
  }
}
