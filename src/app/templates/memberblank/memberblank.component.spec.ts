import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberblankComponent } from './memberblank.component';

describe('MemberblankComponent', () => {
  let component: MemberblankComponent;
  let fixture: ComponentFixture<MemberblankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberblankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberblankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
