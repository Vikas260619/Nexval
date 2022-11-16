import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceInternalComponent } from './attendence-internal.component';

describe('AttendenceInternalComponent', () => {
  let component: AttendenceInternalComponent;
  let fixture: ComponentFixture<AttendenceInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceInternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
