import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacypolicy',
  imports: [RouterModule],
  templateUrl: './privacypolicy.html',
  styleUrl: './privacypolicy.css'
})
export class Privacypolicy {
  constructor(private router: Router) {}
}
