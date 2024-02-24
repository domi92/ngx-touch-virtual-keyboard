import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ICON_DELETE, ICON_KEYBOARD, KEYBOARD_LAYOUT, KEYBOARD_LAYOUT_NUMBER, NgxTouchVirtualKeyboardModule} from 'ngx-touch-virtual-keyboard';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxTouchVirtualKeyboardModule],
  providers: [
    {provide: ICON_DELETE, useValue: 'assets/icons/bugs.svg'},
    {provide: ICON_KEYBOARD, useValue: 'assets/icons/bugs.svg'},
    // {provide: KEYBOARD_LAYOUT, useValue:  [
    //   ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'delete'],
    //   ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p' , 'è', '+'],
    //   ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ò', 'à', 'ù'],
    //   ['shift','y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.','shift'],
    //   ['space', 'left', 'right']
    // ]},
    // {
    //   provide: KEYBOARD_LAYOUT_NUMBER,
    //   useValue: [
    //     ['1', '2', '3'],
    //     ['4', '5', '6'],
    //     ['7', '8', '9'],
    //     ['0', 'delete']
    //   ]
    // }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
