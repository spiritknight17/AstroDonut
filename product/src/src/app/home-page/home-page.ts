import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Swiper } from 'swiper';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  private swiper: Swiper | undefined;
  private currentIndex: number = 0;
  private slidesPerView: number = 3;
  private autoPlayInterval: any;
  private animationFrame: number | undefined;
  private lastTimestamp: number = 0;
  private isManuallyScrolling: boolean = false;
  private manualScrollTimeout: any;
  private autoScrollPosition = 0;
  public products: Product[] = [];
  constructor(private productService: ProductService, private route: ActivatedRoute, private el: ElementRef) {}

  ngOnInit(): void {
    console.log("ngOnInit called");
      this.productService.getTopRatedProducts().subscribe(topProducts => {
        this.products = topProducts;
        setTimeout(() => this.initializeCarousel(), 0);
      });
    (window as any).scrollCarousel = (direction: 'prev' | 'next') => {
      this.scrollCarousel(direction);
    };
     this.route.fragment.subscribe(fragment => {
      if (fragment === 'deals') {
        setTimeout(() => {
          const element = document.getElementById('deals');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      }
    });
    setTimeout(() => {
        const homeElements = this.el.nativeElement.querySelectorAll('.HomeSection1Text, .HomeSection1Buttons, .Donut');
        
        homeElements.forEach((el: HTMLElement) => {
            el.classList.add('popover-open');
            if (el.classList.contains('Donut')) {
                el.classList.add('scrolling');
            }
        });
    }, 1000);
    this.initializeAnimations();
  }

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  private initializeSwiper(): void {
    this.swiper = new Swiper('.tranding-slider', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  }
  scrollCarousel(direction: 'prev' | 'next'): void {
    this.stopAutoPlay();
    this.isManuallyScrolling = true;
    
    if (this.manualScrollTimeout) {
      clearTimeout(this.manualScrollTimeout);
    }
    
    const carouselList = document.getElementById('carousel-list');
    if (!carouselList) return;

    const slideWidth = 310;
    const totalSlides = carouselList.children.length;

    if (direction === 'next') {
      this.currentIndex++;
    } else {
      this.currentIndex--;
    }
    carouselList.style.transition = 'transform 0.4s ease';
    const translateX = -this.currentIndex * slideWidth;
    carouselList.style.transform = `translateX(${translateX}px)`;

    setTimeout(() => {
      if (this.currentIndex >= totalSlides / 2) {
        this.currentIndex = 0;
        carouselList.style.transition = 'none';
        carouselList.style.transform = `translateX(0px)`;
      } else if (this.currentIndex < 0) {
        this.currentIndex = totalSlides / 2 - 1;
        carouselList.style.transition = 'none';
        carouselList.style.transform = `translateX(${-this.currentIndex * slideWidth}px)`;
      }
    }, 400);
    
    this.manualScrollTimeout = setTimeout(() => {
      this.isManuallyScrolling = false;
      this.startAutoPlay();
    }, 3000); 
  }
  scrollToDeals(event: Event): void {
    event.preventDefault();
    const element = document.getElementById('deals');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  private initializeAnimations(): void {
    setTimeout(() => {
      const homeElements = document.querySelectorAll('.HomeSection1Text, .HomeSection1Buttons, .Donut, .DealsDescription h1, .DealsDescription p');
      homeElements.forEach(el => {
      el.classList.add('popover-open');
      if (el.classList.contains('Donut') || el.classList.contains('DealsDescription p') || el.classList.contains('DealsDescription h1')) {
        el.classList.add('scrolling');
      }
    });
    }, 1000);
    
    
    const panElements = document.querySelectorAll('.Donut1, .Donut3, .Donut2, .IcedCoffee1');
    panElements.forEach(el => {
      el.classList.remove('pan-hidden');
      el.classList.add('pan-visible');
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('Donut') || entry.target.classList.contains('DealsDescription p') || entry.target.classList.contains('DealsDescription h1')) {
          if (entry.isIntersecting) {
            entry.target.classList.add('popover-open', 'scrolling'); 
          } else {
            entry.target.classList.remove('popover-open', 'scrolling'); 
          }
        } else {
          if (entry.isIntersecting) {
            entry.target.classList.add('popover-open');
          } else {
            entry.target.classList.remove('popover-open');
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    const panObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pan-hidden');
          entry.target.classList.add('pan-visible');
        } else {
          entry.target.classList.remove('pan-visible');
          entry.target.classList.add('pan-hidden');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });
    
    const carouselObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animate');
        } else {
          entry.target.classList.remove('scroll-animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    const donutElement = document.querySelector('.Donut');
    const homeSection1Text = document.querySelector('.HomeSection1Text');
    const homeSection1Buttons = document.querySelector('.HomeSection1Buttons');
    const dealsDescriptionH1 = document.querySelector('.DealsDescription h1');
    const dealsDescriptionP = document.querySelector('.DealsDescription p');
    const donut1Element = document.querySelector('.Donut1');
    const donut3Element = document.querySelector('.Donut3');
    const donut2Element = document.querySelector('.Donut2');
    const icedCoffee1Element = document.querySelector('.IcedCoffee1');
    
    if (homeSection1Text) observer.observe(homeSection1Text);
    if (homeSection1Buttons) observer.observe(homeSection1Buttons);
    if (donutElement) observer.observe(donutElement);
    if (dealsDescriptionH1) observer.observe(dealsDescriptionH1);
    if (dealsDescriptionP) observer.observe(dealsDescriptionP);
    if (donut1Element) panObserver.observe(donut1Element);
    if (donut3Element) panObserver.observe(donut3Element);
    if (donut2Element) panObserver.observe(donut2Element);
    if (icedCoffee1Element) panObserver.observe(icedCoffee1Element);
    
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => carouselObserver.observe(card));
  }

  private initializeCarousel(): void {
    if (!this.products || this.products.length === 0) return;

    const carouselList = document.getElementById('carousel-list');
    if (!carouselList) return;

    if (!carouselList.hasAttribute('data-cloned')) {
      const slides = Array.from(carouselList.children);
      slides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        carouselList.appendChild(clone);
      });
      carouselList.setAttribute('data-cloned', 'true');
    }

    this.startAutoPlay();
  }

  private startAutoPlay(): void {
    const carouselList = document.getElementById('carousel-list');
    if (!carouselList) return;
    const gap = 30;
    let lastTime = performance.now();
    const pixelsPerSecond = 60;
    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      this.autoScrollPosition += pixelsPerSecond * (deltaTime / 1000);
      carouselList.style.transition = 'none';
      carouselList.style.transform = `translateX(-${this.autoScrollPosition}px)`;
      let first = carouselList.firstElementChild as HTMLElement | null;
      while (first) {
        const firstWidth = (first.getBoundingClientRect().width || 310) + gap;
        if (this.autoScrollPosition >= firstWidth) {
          this.autoScrollPosition -= firstWidth;
          carouselList.appendChild(first);
          first = carouselList.firstElementChild as HTMLElement | null;
        } else {
          break;
        }
      }
      this.animationFrame = requestAnimationFrame(animate);
    };
    this.animationFrame = requestAnimationFrame(animate);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private clearManualScrollTimeout(): void {
    if (this.manualScrollTimeout) {
      clearTimeout(this.manualScrollTimeout);
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
    this.clearManualScrollTimeout();
  }
}
