import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCollabInternalComponent } from './member-collab-internal.component';

describe('MemberCollabInternalComponent', () => {
  let component: MemberCollabInternalComponent;
  let fixture: ComponentFixture<MemberCollabInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCollabInternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCollabInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
