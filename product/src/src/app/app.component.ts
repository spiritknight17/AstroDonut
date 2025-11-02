import { Component } from '@angular/core';
import { RouterModule, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


import { Footer } from './footer/footer';
import { Header } from './header/header';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AstroDonut'
  showLayout = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url;
        this.showLayout = !url.startsWith('/checkout');
      }
    });
  }
}