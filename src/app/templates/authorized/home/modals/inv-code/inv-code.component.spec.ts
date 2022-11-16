import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvCodeComponent } from './inv-code.component';

describe('InvCodeComponent', () => {
  let component: InvCodeComponent;
  let fixture: ComponentFixture<InvCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
