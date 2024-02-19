import {InjectionToken, NgModule} from '@angular/core';
import {NgxTouchVirtualKeyboardComponent} from './ngx-touch-virtual-keyboard.component';
import {FormsModule} from '@angular/forms';
import {UseKeyboardDirective} from './ngx-use-keyboard.directive';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RepeatActionDirective } from './repeat-action.directive';

export const ICON_KEYBOARD = new InjectionToken<string>('iconKeyboard');
export const ICON_DELETE = new InjectionToken<string>('iconDelete');
export const KEYBOARD_LAYOUT = new InjectionToken<string[][]>('keyboardLayout');


// numericOnlyLayout: string[][] = [
//   ['1', '2', '3'],
//   ['4', '5', '6'],
//   ['7', '8', '9'],
//   ['0', 'delete'],
// ];

@NgModule({
  declarations: [UseKeyboardDirective, RepeatActionDirective, NgxTouchVirtualKeyboardComponent],
  providers: [
    {provide: ICON_KEYBOARD, useValue: '/assets/icons/keyboard.svg'},
    {provide: ICON_DELETE, useValue: '/assets/icons/delete-left.svg'},
    {provide: KEYBOARD_LAYOUT, useValue:  [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'delete'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['shift','z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.','shift'],
      ['space', 'left', 'right']
    ]}
  ],
  imports: [FormsModule, BrowserModule, BrowserAnimationsModule],

  exports: [UseKeyboardDirective, NgxTouchVirtualKeyboardComponent],
})
export class NgxTouchVirtualKeyboardModule {}
