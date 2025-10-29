import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/'], { fragment: 'home-page' }).then(() => {
      const element = document.getElementById('home-page');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start'});
      }
    });
  }
  goToDeals() {
    this.router.navigate(['/'], { fragment: 'deals' }).then(() => {
      const element = document.getElementById('deals');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start'});
      }
    });
  }
}
