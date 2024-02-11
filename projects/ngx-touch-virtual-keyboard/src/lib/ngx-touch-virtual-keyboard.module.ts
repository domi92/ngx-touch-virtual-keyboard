import {NgModule} from '@angular/core';
import {NgxTouchVirtualKeyboardComponent} from './ngx-touch-virtual-keyboard.component';
import {FormsModule} from '@angular/forms';
import {UseKeyboardDirective} from './ngx-use-keyboard.directive';

@NgModule({
  declarations: [UseKeyboardDirective, NgxTouchVirtualKeyboardComponent],
  imports: [FormsModule],
  exports: [FormsModule, UseKeyboardDirective, NgxTouchVirtualKeyboardComponent],
})
export class NgxTouchVirtualKeyboardModule {}
