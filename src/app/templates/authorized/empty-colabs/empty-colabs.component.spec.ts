import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyColabsComponent } from './empty-colabs.component';

describe('EmptyColabsComponent', () => {
  let component: EmptyColabsComponent;
  let fixture: ComponentFixture<EmptyColabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyColabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyColabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
