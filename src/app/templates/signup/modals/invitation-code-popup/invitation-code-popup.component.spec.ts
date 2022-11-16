import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationCodePopupComponent } from './invitation-code-popup.component';

describe('InvitationCodePopupComponent', () => {
  let component: InvitationCodePopupComponent;
  let fixture: ComponentFixture<InvitationCodePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationCodePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationCodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
