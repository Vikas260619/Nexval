import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatpageflowComponent } from './chatpageflow.component';

describe('ChatpageflowComponent', () => {
  let component: ChatpageflowComponent;
  let fixture: ComponentFixture<ChatpageflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatpageflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatpageflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
