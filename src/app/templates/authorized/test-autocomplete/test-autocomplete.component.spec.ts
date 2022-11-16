import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAutocompleteComponent } from './test-autocomplete.component';

describe('TestAutocompleteComponent', () => {
  let component: TestAutocompleteComponent;
  let fixture: ComponentFixture<TestAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
