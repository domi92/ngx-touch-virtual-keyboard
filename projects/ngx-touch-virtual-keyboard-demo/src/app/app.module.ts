import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  ICON_DELETE,
  ICON_KEYBOARD,
  KEYBOARD_LAYOUT,
  KEYBOARD_LAYOUT_NUMBER,
  NgxTouchVirtualKeyboardModule,
} from 'ngx-touch-virtual-keyboard';
import { MyInputComponent } from './components/my-input/my-input.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomComponent } from './components/custom/custom.component';
import { DefaultComponent } from './components/default/default.component';

@NgModule({
  declarations: [AppComponent, MyInputComponent, CustomComponent, DefaultComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    AppRoutingModule,
    NgxTouchVirtualKeyboardModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // { provide: ICON_DELETE, useValue: 'assets/icons/bugs.svg' },
    // { provide: ICON_KEYBOARD, useValue: 'assets/icons/bugs.svg' },
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
