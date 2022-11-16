import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabtemplateComponent } from './collabtemplate.component';

describe('CollabtemplateComponent', () => {
  let component: CollabtemplateComponent;
  let fixture: ComponentFixture<CollabtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabtemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
