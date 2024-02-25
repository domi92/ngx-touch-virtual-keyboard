import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UseKeyboardDirective } from './ngx-use-keyboard.directive';
import { RepeatActionDirective } from './repeat-action.directive';
import { NgxTouchVirtualKeyboardComponent } from './ngx-touch-virtual-keyboard.component';
import { INGXKeyElement, k } from './ngx-key-element';

export const ICON_DELETE = new InjectionToken<string>('ICON_DELETE');
export const ICON_ERASE = new InjectionToken<string>('ICON_ERASE');
export const ICON_EYE_SLASH = new InjectionToken<string>('ICON_EYE_SLASH');
export const ICON_EYE = new InjectionToken<string>('ICON_EYE');
export const ICON_KEYBOARD = new InjectionToken<string>('ICON_KEYBOARD');
export const ICON_KEYBOARD_CLOSE = new InjectionToken<string>('ICON_KEYBOARD_CLOSE');
export const ICON_LEFT = new InjectionToken<string>('ICON_LEFT');
export const ICON_RIGHT = new InjectionToken<string>('ICON_RIGHT');
export const ICON_SHIFT = new InjectionToken<string>('ICON_SHIFT');
export const ICON_TAB = new InjectionToken<string>('ICON_TAB');
export const KEYBOARD_LAYOUT = new InjectionToken<INGXKeyElement[][]>('KEYBOARD_LAYOUT');
export const KEYBOARD_LAYOUT_NUMBER = new InjectionToken<string[][]>('KEYBOARD_LAYOUT_NUMBER');

@NgModule({
  declarations: [UseKeyboardDirective, RepeatActionDirective, NgxTouchVirtualKeyboardComponent],
  providers: [
    { provide: ICON_DELETE, useValue: '../assets/ngx-tvk/icon/delete-left.svg' },
    { provide: ICON_ERASE, useValue: '../assets/ngx-tvk/icon/erase.svg' },
    { provide: ICON_EYE_SLASH, useValue: '../assets/ngx-tvk/icon/eye-slash.svg' },
    { provide: ICON_EYE, useValue: '../assets/ngx-tvk/icon/eye.svg' },
    { provide: ICON_KEYBOARD, useValue: '../assets/ngx-tvk/icon/keyboard.svg' },
    { provide: ICON_KEYBOARD_CLOSE, useValue: '../assets/ngx-tvk/icon/keyboard.svg' },
    { provide: ICON_LEFT, useValue: '../assets/ngx-tvk/icon/left.svg' },
    { provide: ICON_RIGHT, useValue: '../assets/ngx-tvk/icon/right.svg' },
    { provide: ICON_SHIFT, useValue: '../assets/ngx-tvk/icon/shift.svg' },
    { provide: ICON_TAB, useValue: '../assets/ngx-tvk/icon/tab.svg' },
    {
      provide: KEYBOARD_LAYOUT,
      useValue: [
        [k('\\', '|'), k('1', '!'), k('2', '"'), k('3', '£'), k('4', '$'), k('5', '%'), k('6', '&'), k('7', '/'), k('8', '('), k('9', ')'), k('0', '='), k('\'', '?'), 'delete'],
        ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', k(',', ';'), k('.', ':'), k('-', '_'), 'shift'],
        ['space', 'left', 'right']
      ]
    },
    {
      provide: KEYBOARD_LAYOUT_NUMBER,
      useValue: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['.', '0', 'delete']
      ]
    }
  ],
  imports: [FormsModule, BrowserModule, BrowserAnimationsModule],

  exports: [UseKeyboardDirective, NgxTouchVirtualKeyboardComponent]
})
export class NgxTouchVirtualKeyboardModule {}


