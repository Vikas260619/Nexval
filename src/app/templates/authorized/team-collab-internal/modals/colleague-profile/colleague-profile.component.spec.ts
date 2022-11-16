import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleagueProfileComponent } from './colleague-profile.component';

describe('ColleagueProfileComponent', () => {
  let component: ColleagueProfileComponent;
  let fixture: ComponentFixture<ColleagueProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColleagueProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColleagueProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
