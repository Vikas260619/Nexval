import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPaneAllcollabComponent } from './sidebar-pane-allcollab.component';

describe('SidebarPaneAllcollabComponent', () => {
  let component: SidebarPaneAllcollabComponent;
  let fixture: ComponentFixture<SidebarPaneAllcollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPaneAllcollabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPaneAllcollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
