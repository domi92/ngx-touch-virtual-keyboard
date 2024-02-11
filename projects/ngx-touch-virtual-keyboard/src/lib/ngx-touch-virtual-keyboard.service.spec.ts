import { TestBed } from '@angular/core/testing';

import { NgxTouchVirtualKeyboardService } from './ngx-touch-virtual-keyboard.service';

describe('NgxTouchVirtualKeyboardService', () => {
  let service: NgxTouchVirtualKeyboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTouchVirtualKeyboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
