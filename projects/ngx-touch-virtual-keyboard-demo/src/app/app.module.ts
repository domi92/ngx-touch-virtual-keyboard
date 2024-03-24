import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { KEYBOARD_MAP_INPUT_TO_LAYOUT, NgxTouchVirtualKeyboardModule } from 'ngx-touch-virtual-keyboard';
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
    MatSelectModule,
    AppRoutingModule,
    NgxTouchVirtualKeyboardModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // { provide: ICON_BACKSPACE, useValue: 'assets/icons/bugs.svg' },
    // { provide: ICON_KEYBOARD, useValue: 'assets/icons/bugs.svg' },
    // {
    //   provide: KEYBOARD_MAP_INPUT_TO_LAYOUT,
    //   useValue: [
    //     { inputType: 'text', keyboardType: 'number' },
    //     { inputType: 'url', keyboardType: 'number' },
    //     { inputType: 'email', keyboardType: 'number' },
    //     { inputType: 'password', keyboardType: 'number' },
    //     { inputType: 'number', keyboardType: 'number' },
    //     { inputType: 'range', keyboardType: 'number' },
    //     { inputType: 'tel', keyboardType: 'number' },
    //   ],
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
