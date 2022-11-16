import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPaneCalenderComponent } from './sidebar-pane-calender.component';

describe('SidebarPaneCalenderComponent', () => {
  let component: SidebarPaneCalenderComponent;
  let fixture: ComponentFixture<SidebarPaneCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPaneCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPaneCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
