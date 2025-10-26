import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Swiper } from 'swiper';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
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
  }

  ngAfterViewInit(): void {
  const carouselList = document.getElementById('carousel-list');
  if (!carouselList) return;
  const slides = Array.from(carouselList.children);
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    carouselList.appendChild(clone);
  });

  this.slidesPerView = 3;
  (window as any).scrollCarousel = (direction: 'prev' | 'next') => {
    this.scrollCarousel(direction);
  };
  this.initializeAnimations();
  this.startAutoPlay();
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
    // Stop continuous animation and switch to manual scrolling
    this.stopAutoPlay();
    this.isManuallyScrolling = true;
    
    // Clear any existing timeout
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
    
    // Resume auto-play after a delay
    this.manualScrollTimeout = setTimeout(() => {
      this.isManuallyScrolling = false;
      this.startAutoPlay();
    }, 3000); // Resume after 3 seconds
  }
  scrollToDeals(event: Event): void {
    event.preventDefault();
    const element = document.getElementById('deals');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  private initializeAnimations(): void {
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
    const productCardElement = document.querySelector('.product-card');
    if (!productCardElement) return;

    if (homeSection1Text) observer.observe(homeSection1Text);
    if (homeSection1Buttons) observer.observe(homeSection1Buttons);
    if (donutElement) observer.observe(donutElement);
    if (dealsDescriptionH1) observer.observe(dealsDescriptionH1);
    if (dealsDescriptionP) observer.observe(dealsDescriptionP);
    if (donut1Element) panObserver.observe(donut1Element);
    if (donut3Element) panObserver.observe(donut3Element);
    if (donut2Element) panObserver.observe(donut2Element);
    if (icedCoffee1Element) panObserver.observe(icedCoffee1Element);
    if (productCardElement) carouselObserver.observe(productCardElement);
  }

  private startAutoPlay(): void {
    const carouselList = document.getElementById('carousel-list');
    if (!carouselList) return;
    
    const slideWidth = 310;
    let position = 0;
    const speed = 0.5; // pixels per frame
    
    const animate = (timestamp: number) => {
      if (!this.lastTimestamp) this.lastTimestamp = timestamp;
      const deltaTime = timestamp - this.lastTimestamp;
      
      position += speed;
      
      if (position >= slideWidth) {
        position = 0;
      }
      
      carouselList.style.transition = 'none';
      carouselList.style.transform = `translateX(-${position}px)`;
      
      this.lastTimestamp = timestamp;
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
