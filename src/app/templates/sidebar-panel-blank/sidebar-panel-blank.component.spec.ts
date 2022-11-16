import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPanelBlankComponent } from './sidebar-panel-blank.component';

describe('SidebarPanelBlankComponent', () => {
  let component: SidebarPanelBlankComponent;
  let fixture: ComponentFixture<SidebarPanelBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPanelBlankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPanelBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
