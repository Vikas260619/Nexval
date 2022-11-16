import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectDropdownComponent } from './country-select-dropdown.component';

describe('CountrySelectDropdownComponent', () => {
  let component: CountrySelectDropdownComponent;
  let fixture: ComponentFixture<CountrySelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrySelectDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
