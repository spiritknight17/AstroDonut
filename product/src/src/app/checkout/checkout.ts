import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TermsAndConditionsAndRefundPolicy } from '../terms-and-conditions-and-refund-policy/terms-and-conditions-and-refund-policy';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, TermsAndConditionsAndRefundPolicy],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Checkout implements OnInit {
  selectedPayment: string | null = null;
  selectedDeliveryOption: string | null = null;
  paymentdebugMessage: string = 'No payment method selected';
  deliverydebugMessage: string = 'No delivery method selected';
  minDate: string = '';
  dateValidationMessage: string = '';
  timeValidationMessage: string = '';
  showTerms: boolean = false;
  termsChecked: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const nextTwoDays = new Date();
    nextTwoDays.setDate(nextTwoDays.getDate() + 2);
    this.minDate = this.formatDate(nextTwoDays);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  validateDate(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    const selectedDate = new Date(input.value);
    const nextTwoDays = new Date();
    nextTwoDays.setDate(nextTwoDays.getDate() + 2);
    
    this.dateValidationMessage = '';
    
    if (selectedDate < nextTwoDays) {
      this.dateValidationMessage = `${type === 'delivery' ? 'Delivery' : 'Pickup'} date must be at least 2 days`;
      console.warn(this.dateValidationMessage);
      
      input.value = this.minDate;
    }
  }

  validateTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedTime = input.value;
    
    this.timeValidationMessage = '';
    
    if (selectedTime < '07:00' || selectedTime > '22:00') {
      this.timeValidationMessage = 'Time must be between 7:00 AM and 10:00 PM (store hours)';
      console.warn(this.timeValidationMessage);
      
      if (selectedTime < '07:00') {
        input.value = '07:00';
      } else {
        input.value = '22:00';
      }
    }
  }

  selectPayment(paymemtmethod: string): void {
    this.selectedPayment = paymemtmethod;
    this.paymentdebugMessage = `Selected payment method: ${paymemtmethod}`;
    console.log(this.paymentdebugMessage);
  }
  
  selectDeliveryOption(deliverymethod: string): void {
    this.selectedDeliveryOption = deliverymethod;
    this.deliverydebugMessage = `Selected delivery method: ${deliverymethod}`;
    console.log(this.deliverydebugMessage);
  }

  isCardPayment(): boolean {
    return this.selectedPayment === 'Visa' || this.selectedPayment === 'Mastercard';
  }

  isEWalletPayment(): boolean {
    return this.selectedPayment === 'Paypal' || this.selectedPayment === 'GCash' || this.selectedPayment === 'Maya';
  }

  isCashOnDelivery(): boolean {
    return this.selectedPayment === 'Cash-on-delivery';
  }
  
  isDelivery(): boolean {
    return this.selectedDeliveryOption === 'Delivery';
  }
  
  isPickup(): boolean {
    return this.selectedDeliveryOption === 'Pickup';
  }

  toggleTermsPopup() {
    this.showTerms = true;
  }

  closeTermsPopup() {
    this.showTerms = false;
  }

  termsAccepted() {
    this.termsChecked = true;
    const checkbox = document.getElementById('Terms-and-conditions-and-refund-policy') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = true;
    }
  }
  
  clearInputOnFocus(event: FocusEvent) {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    input.value = '';
  }
}
