import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { Menu } from './menu/menu';
import { AboutUs } from './about-us/about-us';
import { Privacypolicy } from './privacypolicy/privacypolicy';
import { Termsofservice } from './termsofservice/termsofservice';

export const routes: Routes = [
  {path:'',component:HomePage},
  {path:'menu',component:Menu},
  {path:'about',component:AboutUs},
  {path:'privacy-policy',component:Privacypolicy},
  {path:'terms-of-service',component:Termsofservice}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
