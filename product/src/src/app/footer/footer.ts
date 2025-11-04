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
  goToLocations() {
    const targetId = 'about-location-h3';
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === '/about') {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
    this.router.navigate(['/about']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      });
    }
  }
  goToContacts() {
    const targetId = 'about-contacts-h3';
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === '/about') {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
    this.router.navigate(['/about']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      });
    }
  }
  goToPrivacyPolicy() {
    const targetId = 'privacy-policy';
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === '/privacy-policy') {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
    this.router.navigate(['/privacy-policy']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      });
    }
  }
  goToTermsandServices() {
    const targetId = 'terms-of-service';
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === '/terms-of-service') {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
    this.router.navigate(['/terms-of-service']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      });
    }
  }
}
