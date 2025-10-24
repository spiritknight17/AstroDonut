import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { Menu } from './menu/menu';
import { AboutUs } from './about-us/about-us';

export const routes: Routes = [
  {path:'',component:HomePage},
  {path:'menu',component:Menu},
  {path:'about',component:AboutUs}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
