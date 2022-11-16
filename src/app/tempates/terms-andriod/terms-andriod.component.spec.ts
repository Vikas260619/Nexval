import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndriodComponent } from './terms-andriod.component';

describe('TermsAndriodComponent', () => {
  let component: TermsAndriodComponent;
  let fixture: ComponentFixture<TermsAndriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
