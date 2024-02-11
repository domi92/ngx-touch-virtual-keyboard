import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTouchVirtualKeyboardComponent } from './ngx-touch-virtual-keyboard.component';

describe('NgxTouchVirtualKeyboardComponent', () => {
  let component: NgxTouchVirtualKeyboardComponent;
  let fixture: ComponentFixture<NgxTouchVirtualKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTouchVirtualKeyboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxTouchVirtualKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
