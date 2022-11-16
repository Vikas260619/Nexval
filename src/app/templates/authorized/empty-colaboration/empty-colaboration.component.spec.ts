import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyColaborationComponent } from './empty-colaboration.component';

describe('EmptyColaborationComponent', () => {
  let component: EmptyColaborationComponent;
  let fixture: ComponentFixture<EmptyColaborationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyColaborationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyColaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
