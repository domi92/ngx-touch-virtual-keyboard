import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UseKeyboardDirective } from './ngx-use-keyboard.directive';
import { RepeatActionDirective } from './repeat-action.directive';
import { NgxTouchVirtualKeyboardComponent } from './ngx-touch-virtual-keyboard.component';
import { INGXKeyElement } from './ngx-key-element';
import {
  defaultKeyboard,
  numberKeyboard,
  telKeyboard,
  emailKeyboard,
  mapInputLayout,
  MapInputType,
  MapKeyboardType,
} from './ngx-touch-virtual-keyboard.resources';

/**
 * Export all icons InjectionToken to give possibility to override icon image
 */
export const ICON_BACKSPACE = new InjectionToken<string>('ICON_BACKSPACE');
export const ICON_ERASE = new InjectionToken<string>('ICON_ERASE');
export const ICON_EYE_SLASH = new InjectionToken<string>('ICON_EYE_SLASH');
export const ICON_EYE = new InjectionToken<string>('ICON_EYE');
export const ICON_KEYBOARD = new InjectionToken<string>('ICON_KEYBOARD');
export const ICON_KEYBOARD_CLOSE = new InjectionToken<string>('ICON_KEYBOARD_CLOSE');
export const ICON_LEFT = new InjectionToken<string>('ICON_LEFT');
export const ICON_RIGHT = new InjectionToken<string>('ICON_RIGHT');
export const ICON_SHIFT = new InjectionToken<string>('ICON_SHIFT');
export const ICON_TAB = new InjectionToken<string>('ICON_TAB');

export const KEYBOARD_LAYOUT_DEFAULT = new InjectionToken<{ layout: string; values: (INGXKeyElement | string)[][] }>(
  'KEYBOARD_LAYOUT_DEFAULT'
);

export const KEYBOARD_LAYOUT_NUMBER = new InjectionToken<{ layout: string; values: (INGXKeyElement | string)[][] }[]>(
  'KEYBOARD_LAYOUT_NUMBER'
);

export const KEYBOARD_LAYOUT_TEL = new InjectionToken<{ layout: string; alues: (INGXKeyElement | string)[][] }[]>('KEYBOARD_LAYOUT_TEL');

export const KEYBOARD_LAYOUT_EMAIL = new InjectionToken<{ layout: string; alues: (INGXKeyElement | string)[][] }[]>(
  'KEYBOARD_LAYOUT_EMAIL'
);

/**
 *
 * Mapping from <input type="X"> to a specific keyobard layout. This is pre mapped, but can be customized.
 * available KeyboardType = 'full' | 'number' | 'password' | 'tel' | 'date' | 'email';
 */
export const KEYBOARD_MAP_INPUT_TO_LAYOUT = new InjectionToken<{ inputType: MapInputType; keyboardType: MapKeyboardType }[]>(
  'NGX_TVK_CONFIGURATION'
);

@NgModule({
  declarations: [UseKeyboardDirective, RepeatActionDirective, NgxTouchVirtualKeyboardComponent],
  providers: [
    { provide: ICON_BACKSPACE, useValue: '../assets/ngx-tvk/icon/delete-left.svg' },
    { provide: ICON_ERASE, useValue: '../assets/ngx-tvk/icon/erase.svg' },
    { provide: ICON_EYE_SLASH, useValue: '../assets/ngx-tvk/icon/eye-slash.svg' },
    { provide: ICON_EYE, useValue: '../assets/ngx-tvk/icon/eye.svg' },
    { provide: ICON_KEYBOARD, useValue: '../assets/ngx-tvk/icon/keyboard.svg' },
    { provide: ICON_KEYBOARD_CLOSE, useValue: '../assets/ngx-tvk/icon/keyboard.svg' },
    { provide: ICON_LEFT, useValue: '../assets/ngx-tvk/icon/left.svg' },
    { provide: ICON_RIGHT, useValue: '../assets/ngx-tvk/icon/right.svg' },
    { provide: ICON_SHIFT, useValue: '../assets/ngx-tvk/icon/shift.svg' },
    { provide: ICON_TAB, useValue: '../assets/ngx-tvk/icon/tab.svg' },
    { provide: KEYBOARD_LAYOUT_DEFAULT, useValue: defaultKeyboard },
    { provide: KEYBOARD_LAYOUT_NUMBER, useValue: numberKeyboard },
    { provide: KEYBOARD_LAYOUT_TEL, useValue: telKeyboard },
    { provide: KEYBOARD_LAYOUT_EMAIL, useValue: emailKeyboard },
    { provide: KEYBOARD_MAP_INPUT_TO_LAYOUT, useValue: mapInputLayout },
  ],
  imports: [FormsModule, BrowserModule, BrowserAnimationsModule],

  exports: [UseKeyboardDirective, NgxTouchVirtualKeyboardComponent],
})
export class NgxTouchVirtualKeyboardModule {}
