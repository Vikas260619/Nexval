import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleagueInvitationComponent } from './colleague-invitation.component';

describe('ColleagueInvitationComponent', () => {
  let component: ColleagueInvitationComponent;
  let fixture: ComponentFixture<ColleagueInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColleagueInvitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColleagueInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
