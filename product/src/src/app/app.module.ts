import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { HomePage } from './home-page/home-page';

@NgModule({
  
  declarations: [],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppComponent,
    Header,
    Footer,
    HomePage
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }