import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabflowComponent } from './collabflow.component';

describe('CollabflowComponent', () => {
  let component: CollabflowComponent;
  let fixture: ComponentFixture<CollabflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
