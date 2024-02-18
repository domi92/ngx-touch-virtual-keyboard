import {InjectionToken, NgModule} from '@angular/core';
import {NgxTouchVirtualKeyboardComponent} from './ngx-touch-virtual-keyboard.component';
import {FormsModule} from '@angular/forms';
import {UseKeyboardDirective} from './ngx-use-keyboard.directive';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RepeatActionDirective } from './repeat-action.directive';

export const ICON_KEYBOARD = new InjectionToken<string>('');
export const ICON_DELETE = new InjectionToken<string>('');

@NgModule({
  declarations: [UseKeyboardDirective, RepeatActionDirective, NgxTouchVirtualKeyboardComponent],
  providers: [
    {provide: ICON_KEYBOARD, useValue: '/assets/icons/keyboard.svg'},
    {provide: ICON_DELETE, useValue: '/assets/icons/delete-left.svg'},
  ],
  imports: [FormsModule, BrowserModule, BrowserAnimationsModule],

  exports: [UseKeyboardDirective, NgxTouchVirtualKeyboardComponent],
})
export class NgxTouchVirtualKeyboardModule {}
