import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCollabComponent } from './team-collab.component';

describe('TeamCollabComponent', () => {
  let component: TeamCollabComponent;
  let fixture: ComponentFixture<TeamCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCollabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
