import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ICON_DELETE, ICON_KEYBOARD, KEYBOARD_LAYOUT, NgxTouchVirtualKeyboardModule} from 'dist/ngx-touch-virtual-keyboard';
// import {ICON_DELETE, ICON_KEYBOARD, NgxTouchVirtualKeyboardModule} from 'ngx-touch-virtual-keyboard';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxTouchVirtualKeyboardModule],
  providers: [
    {provide: ICON_DELETE, useValue: 'assets/icons/my-delete-left.svg'},
    // {provide: ICON_KEYBOARD, useValue: 'assets/icons/my-keyboard.svg'},
    {provide: ICON_KEYBOARD, useValue: 'dist/ngx-touch-virtual-keyboard/assets/icon/keyboard.svg'},
    // {provide: KEYBOARD_LAYOUT, useValue:  [
    //   ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'delete'],
    //   ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
    //   ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    //   ['shift','y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.','shift'],
    //   ['space', 'left', 'right']
    // ]},
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
