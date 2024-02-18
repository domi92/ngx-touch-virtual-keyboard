import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ICON_DELETE, ICON_KEYBOARD, NgxTouchVirtualKeyboardModule} from 'ngx-touch-virtual-keyboard';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxTouchVirtualKeyboardModule],
  providers: [
    {provide: ICON_DELETE, useValue: 'assets/icons/my-delete-left.svg'},
    {provide: ICON_KEYBOARD, useValue: 'assets/icons/my-keyboard.svg'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
