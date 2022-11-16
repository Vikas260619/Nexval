import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceLoginComponent } from './force-login.component';

describe('ForceLoginComponent', () => {
  let component: ForceLoginComponent;
  let fixture: ComponentFixture<ForceLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForceLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
