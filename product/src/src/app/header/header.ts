import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Cart } from "../cart/cart";
import { CartService } from '../service/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, Cart, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  showCart = false;
  cartItems: any[] = [];
  totalItems = 0;
  searchQuery: string = '';
  constructor(private router: Router, private cartService: CartService) {}
  toggleCartPopup() {
    this.showCart = !this.showCart;
    if (this.showCart) {
      this.cartService.refreshCart();
    }
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
  goToMenu() {
    const targetId = 'menu';
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === '/menu') {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
    this.router.navigate(['/menu']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      });
    }
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/menu'], { queryParams: { search: this.searchQuery.trim() } });
    }
  }

  onSearchKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.performSearch();
    }
  }

}
