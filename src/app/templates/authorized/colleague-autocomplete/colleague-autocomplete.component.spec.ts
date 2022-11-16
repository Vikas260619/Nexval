import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleagueAutocompleteComponent } from './colleague-autocomplete.component';

describe('ColleagueAutocompleteComponent', () => {
  let component: ColleagueAutocompleteComponent;
  let fixture: ComponentFixture<ColleagueAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColleagueAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColleagueAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
