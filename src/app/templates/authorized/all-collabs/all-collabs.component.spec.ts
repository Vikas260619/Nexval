import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCollabsComponent } from './all-collabs.component';

describe('AllCollabsComponent', () => {
  let component: AllCollabsComponent;
  let fixture: ComponentFixture<AllCollabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCollabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCollabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
