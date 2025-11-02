import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TermsAndConditionsAndRefundPolicy } from '../terms-and-conditions-and-refund-policy/terms-and-conditions-and-refund-policy';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TermsAndConditionsAndRefundPolicy],
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
  shippingCost: number = 50;
  taxRate: number = 0.12;
  taxAmount: number = 0;
  
  formData = {
    fullname: '',
    emailaddress: '',
    phonenumber: '',
    streetaddress: '',
    city: '',
    province: '',
    zipcode: '',
    country: '',
    deliveryDate: '',
    deliveryTime: ''
  };
  
  formErrors = {
    fullname: '',
    emailaddress: '',
    phonenumber: '',
    streetaddress: '',
    city: '',
    province: '',
    zipcode: '',
    country: '',
    payment: '',
    delivery: '',
    terms: ''
  };
  
  @Input()cartItems: any[] = []
  constructor(private router: Router, public cartService: CartService) {}

  ngOnInit(): void {
    const nextTwoDays = new Date();
    nextTwoDays.setDate(nextTwoDays.getDate() + 2);
    this.minDate = this.formatDate(nextTwoDays);
    
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTaxAmount();
    });
    this.cartService.refreshCart();
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
    } else {
      if (type === 'delivery') {
        this.formData.deliveryDate = input.value;
      }
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
    } else {
      this.formData.deliveryTime = selectedTime;
    }
  }

  selectPayment(paymemtmethod: string): void {
    this.selectedPayment = paymemtmethod;
    this.paymentdebugMessage = `Selected payment method: ${paymemtmethod}`;
    this.formErrors.payment = '';
    console.log(this.paymentdebugMessage);
  }
  
  selectDeliveryOption(deliverymethod: string): void {
    this.selectedDeliveryOption = deliverymethod;
    this.deliverydebugMessage = `Selected delivery method: ${deliverymethod}`;
    this.formErrors.delivery = '';
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

  toggleTermsPopup(): void {
    this.showTerms = true;
  }

  closeTermsPopup(): void {
    this.showTerms = false;
  }

  termsAccepted(): void {
    this.termsChecked = true;
    this.formErrors.terms = '';
    const checkbox = document.getElementById('Terms-and-conditions-and-refund-policy') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = true;
    }
    this.closeTermsPopup();
  }
  
  clearInputOnFocus(event: FocusEvent) {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    const defaultValues = [
      'Input Fullname', 
      'Input Email Address', 
      'Input Phone Number', 
      'Input Street Address', 
      'Input City/Municipality', 
      'Input Province/Region', 
      'Input ZIP/Postal Code', 
      'Input Country',
      'Input Delivery Instructions or Landmark',
      'Input Card Number',
      'Input Expiration Date',
      'Input CVV',
      'Input Account Number',
      'Input Account Name'
    ];
    
    if (defaultValues.includes(input.value)) {
      input.value = '';
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  calculateTaxAmount(): void {
    this.taxAmount = this.getTotalPrice() * this.taxRate;
  }
  
  getTotalWithShippingAndTax(): number {
    return this.getTotalPrice() + this.shippingCost + this.taxAmount;
  }
  
  validateForm(): boolean {
    let isValid = true;
    
    Object.keys(this.formErrors).forEach(key => {
      this.formErrors[key as keyof typeof this.formErrors] = '';
    });
    
    if (!this.formData.fullname || this.formData.fullname === 'Input Fullname') {
      this.formErrors.fullname = 'Name is required';
      isValid = false;
    }
    
    if (!this.formData.emailaddress || this.formData.emailaddress === 'Input Email Address') {
      this.formErrors.emailaddress = 'Email address is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(this.formData.emailaddress)) {
      this.formErrors.emailaddress = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!this.formData.phonenumber || this.formData.phonenumber === 'Input Phone Number') {
      this.formErrors.phonenumber = 'Phone number is required';
      isValid = false;
    }
    
    if (!this.formData.streetaddress || this.formData.streetaddress === 'Input Street Address') {
      this.formErrors.streetaddress = 'Street address is required';
      isValid = false;
    }
    
    if (!this.formData.city || this.formData.city === 'Input City/Municipality') {
      this.formErrors.city = 'City/Municipality is required';
      isValid = false;
    }
    
    if (!this.formData.province || this.formData.province === 'Input Province/Region') {
      this.formErrors.province = 'Province/Region is required';
      isValid = false;
    }
    
    if (!this.formData.zipcode || this.formData.zipcode === 'Input ZIP/Postal Code') {
      this.formErrors.zipcode = 'ZIP/Postal Code is required';
      isValid = false;
    }
    
    if (!this.formData.country || this.formData.country === 'Input Country') {
      this.formErrors.country = 'Country is required';
      isValid = false;
    }
    
    if (!this.selectedPayment) {
      this.formErrors.payment = 'Please select a payment method';
      isValid = false;
    }
    
    if (!this.selectedDeliveryOption) {
      this.formErrors.delivery = 'Please select a delivery option';
      isValid = false;
    }
    
    if (!this.termsChecked) {
      this.formErrors.terms = 'You must accept the Terms & Conditions';
      isValid = false;
    }
    
    return isValid;
  }
  
  finalizeOrder(): void {
    if (this.validateForm()) {
      alert('Thank you for your order! Your order has been placed successfully.');
      this.cartService.clearCart();
      this.router.navigate(['/']);
    } else {
      alert('Please fill in all required fields before finalizing your order.');
    }
  }
}
