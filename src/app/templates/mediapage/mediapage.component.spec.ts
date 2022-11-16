import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediapageComponent } from './mediapage.component';

describe('MediapageComponent', () => {
  let component: MediapageComponent;
  let fixture: ComponentFixture<MediapageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediapageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediapageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
