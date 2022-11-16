import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinUserAttendenceComponent } from './loggedin-user-attendence.component';

describe('LoggedinUserAttendenceComponent', () => {
  let component: LoggedinUserAttendenceComponent;
  let fixture: ComponentFixture<LoggedinUserAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedinUserAttendenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedinUserAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
