import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { HomePage } from './home-page/home-page';
import { Menu } from './menu/menu';
import { RouterOutlet } from '@angular/router';
import { AboutUs } from './about-us/about-us';
import { Cart } from './cart/cart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppComponent,
    Header,
    Footer,
    HomePage,
    Menu,
    AboutUs,
    Cart,
    RouterOutlet
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }