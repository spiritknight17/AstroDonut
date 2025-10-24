import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(private router: Router) {}
  goToDeals() {
    this.router.navigate(['/'], { fragment: 'deals' }).then(() => {
      const element = document.getElementById('deals');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
