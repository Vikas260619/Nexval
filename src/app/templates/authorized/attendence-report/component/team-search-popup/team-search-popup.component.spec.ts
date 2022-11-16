import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSearchPopupComponent } from './team-search-popup.component';

describe('TeamSearchPopupComponent', () => {
  let component: TeamSearchPopupComponent;
  let fixture: ComponentFixture<TeamSearchPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamSearchPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSearchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
