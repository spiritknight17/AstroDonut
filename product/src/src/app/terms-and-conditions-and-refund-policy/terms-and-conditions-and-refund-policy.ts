import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms-and-conditions-and-refund-policy.html',
  styleUrl: './terms-and-conditions-and-refund-policy.css',
  animations: [
    trigger('termsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('350ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('350ms ease-in-out', style({ opacity: 0, transform: 'translateY(40px)' }))
      ])
    ])
  ]
})
export class TermsAndConditionsAndRefundPolicy {
  @Input() showTerms = false;
  @Output() closeTerms = new EventEmitter<void>();
  @Output() termsAccepted = new EventEmitter<void>();

  closeTermsPopup(event?: Event) {
    if (event) event.stopPropagation();
    this.closeTerms.emit();
  }

  acceptTerms() {
    this.termsAccepted.emit();
    this.closeTerms.emit();
  }
}