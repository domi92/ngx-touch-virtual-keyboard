import {InjectionToken, NgModule} from '@angular/core';
import {NgxTouchVirtualKeyboardComponent} from './ngx-touch-virtual-keyboard.component';
import {FormsModule} from '@angular/forms';
import {UseKeyboardDirective} from './ngx-use-keyboard.directive';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const ICON_KEYBOARD = new InjectionToken<string>('');
export const ICON_DELETE = new InjectionToken<string>('');

@NgModule({
  declarations: [UseKeyboardDirective, NgxTouchVirtualKeyboardComponent],
  providers: [
    {provide: ICON_KEYBOARD, useValue: '/assets/icons/keyboard.svg'},
    {provide: ICON_DELETE, useValue: '/assets/icons/delete-left.svg'},
  ],
  imports: [FormsModule, BrowserModule, BrowserAnimationsModule],

  exports: [FormsModule, BrowserModule, BrowserAnimationsModule, UseKeyboardDirective, NgxTouchVirtualKeyboardComponent],
})
export class NgxTouchVirtualKeyboardModule {}
