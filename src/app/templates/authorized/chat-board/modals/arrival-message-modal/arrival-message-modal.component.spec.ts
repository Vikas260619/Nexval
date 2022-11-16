import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalMessageModalComponent } from './arrival-message-modal.component';

describe('ArrivalMessageModalComponent', () => {
  let component: ArrivalMessageModalComponent;
  let fixture: ComponentFixture<ArrivalMessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrivalMessageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
