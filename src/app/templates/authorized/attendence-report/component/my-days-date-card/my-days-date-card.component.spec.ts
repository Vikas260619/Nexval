import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDaysDateCardComponent } from './my-days-date-card.component';

describe('MyDaysDateCardComponent', () => {
  let component: MyDaysDateCardComponent;
  let fixture: ComponentFixture<MyDaysDateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDaysDateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDaysDateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
