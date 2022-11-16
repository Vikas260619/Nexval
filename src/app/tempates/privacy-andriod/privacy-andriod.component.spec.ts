import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyAndriodComponent } from './privacy-andriod.component';

describe('PrivacyAndriodComponent', () => {
  let component: PrivacyAndriodComponent;
  let fixture: ComponentFixture<PrivacyAndriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyAndriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyAndriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
