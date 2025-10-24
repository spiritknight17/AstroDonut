import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit } from '@angular/core';
import { Swiper } from 'swiper';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit, AfterViewInit {
  private swiper: Swiper | undefined;
  private currentIndex: number = 0;
  private slidesPerView: number = 3;
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
  }
  scrollToDeals(event: Event): void {
    event.preventDefault();
    const element = document.getElementById('deals');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
