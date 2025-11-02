import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsAndRefundPolicy } from './terms-and-conditions-and-refund-policy';

describe('TermsAndConditionsAndRefundPolicy', () => {
  let component: TermsAndConditionsAndRefundPolicy;
  let fixture: ComponentFixture<TermsAndConditionsAndRefundPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAndConditionsAndRefundPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsAndConditionsAndRefundPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
