import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInvitationComponent } from './emp-invitation.component';

describe('EmpInvitationComponent', () => {
  let component: EmpInvitationComponent;
  let fixture: ComponentFixture<EmpInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpInvitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
