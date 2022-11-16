import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMapPopupComponent } from './single-map-popup.component';

describe('SingleMapPopupComponent', () => {
  let component: SingleMapPopupComponent;
  let fixture: ComponentFixture<SingleMapPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMapPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
