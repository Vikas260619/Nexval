import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPaneBlackComponent } from './sidebar-pane-black.component';

describe('SidebarPaneBlackComponent', () => {
  let component: SidebarPaneBlackComponent;
  let fixture: ComponentFixture<SidebarPaneBlackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPaneBlackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPaneBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
