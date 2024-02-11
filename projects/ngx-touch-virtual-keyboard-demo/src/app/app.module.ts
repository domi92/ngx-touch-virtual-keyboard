import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxTouchVirtualKeyboardModule} from 'ngx-touch-virtual-keyboard';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxTouchVirtualKeyboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
