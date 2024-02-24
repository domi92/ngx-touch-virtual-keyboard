import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UseKeyboardDirective } from './ngx-use-keyboard.directive';
import { RepeatActionDirective } from './repeat-action.directive';
import { NgxTouchVirtualKeyboardComponent } from './ngx-touch-virtual-keyboard.component';

export const ICON_DELETE = new InjectionToken<string>('a');
export const ICON_ERASE = new InjectionToken<string>('b');
export const ICON_EYE_SLASH = new InjectionToken<string>('c');
export const ICON_EYE = new InjectionToken<string>('d');
export const ICON_KEYBOARD = new InjectionToken<string>('e');
export const ICON_LEFT = new InjectionToken<string>('f');
export const ICON_RIGHT = new InjectionToken<string>('g');
export const ICON_SHIFT = new InjectionToken<string>('h');
export const ICON_SPACE = new InjectionToken<string>('i');
export const KEYBOARD_LAYOUT = new InjectionToken<string[][]>('');

@NgModule({
  declarations: [UseKeyboardDirective, RepeatActionDirective, NgxTouchVirtualKeyboardComponent],
  providers: [
    { provide: ICON_DELETE, useValue: '../assets/icon/delete-left.svg' },
    { provide: ICON_ERASE, useValue: '../assets/icon/erase.svg' },
    { provide: ICON_EYE_SLASH, useValue: '../assets/icon/eye-slash.svg' },
    { provide: ICON_EYE, useValue: '../assets/icon/eye.svg' },
    { provide: ICON_KEYBOARD, useValue: '../assets/icon/keyboard.svg' },
    { provide: ICON_LEFT, useValue: '../assets/icon/left.svg' },
    { provide: ICON_RIGHT, useValue: '../assets/icon/right.svg' },
    { provide: ICON_SHIFT, useValue: '../assets/icon/shift.svg' },
    { provide: ICON_SPACE, useValue: '../assets/icon/space.svg' },
    {
      provide: KEYBOARD_LAYOUT,
      useValue: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'delete'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', 'shift'],
        ['space', 'left', 'right']
      ]
    }
  ],
  imports: [FormsModule, BrowserModule, BrowserAnimationsModule],

  exports: [UseKeyboardDirective, NgxTouchVirtualKeyboardComponent]
})
export class NgxTouchVirtualKeyboardModule {}
