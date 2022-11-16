import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelfAttendenceComponent } from './user-self-attendence.component';

describe('UserSelfAttendenceComponent', () => {
  let component: UserSelfAttendenceComponent;
  let fixture: ComponentFixture<UserSelfAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSelfAttendenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelfAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
