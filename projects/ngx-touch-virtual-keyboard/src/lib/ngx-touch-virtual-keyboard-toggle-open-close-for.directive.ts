import { Input } from '@angular/core';
import { Directive } from '@angular/core';
import { NgxTouchVirtualKeyboardComponent } from './ngx-touch-virtual-keyboard.component';

@Directive({
  selector: '[toggleOpenCloseFor]',
  host: {
    '(click)': 'toggleOpenClose()',
  },
})
export class ToggleOpenCloseForDirective {
  @Input('toggleOpenCloseFor') public toggleOpenCloseFor!: any;

  constructor() {}

  protected toggleOpenClose(): void {
    if (this.toggleOpenCloseFor && this.toggleOpenCloseFor instanceof NgxTouchVirtualKeyboardComponent) {
      this.toggleOpenCloseFor.toggleKeyboard();
    } else {
      console.error('input for toggleOpenCloseFor undefined or not of type NgxTouchVirtualKeyboardComponent');
    }
  }
}
