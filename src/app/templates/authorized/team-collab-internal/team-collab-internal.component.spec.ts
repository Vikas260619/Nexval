import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCollabInternalComponent } from './team-collab-internal.component';

describe('TeamCollabInternalComponent', () => {
  let component: TeamCollabInternalComponent;
  let fixture: ComponentFixture<TeamCollabInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCollabInternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCollabInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
