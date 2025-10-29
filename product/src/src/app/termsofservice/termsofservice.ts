import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termsofservice',
  imports: [RouterModule],
  templateUrl: './termsofservice.html',
  styleUrl: './termsofservice.css'
})
export class Termsofservice {
  constructor(private router: Router) {}

}
