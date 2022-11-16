import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomewithoutteamComponent } from './homewithoutteam.component';

describe('HomewithoutteamComponent', () => {
  let component: HomewithoutteamComponent;
  let fixture: ComponentFixture<HomewithoutteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomewithoutteamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomewithoutteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
