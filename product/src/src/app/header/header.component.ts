import { Component } from '@angular/core';
import { Menu } from '../model/menu';
import { MenuService } from '../service/menu.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menus: Menu[] = [];

  constructor(private menuService: MenuService) {
    this.menuService.getData().subscribe((menus: Menu[]) => {
      this.menus = menus;
    });
  }
}