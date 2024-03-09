import { Component } from '@angular/core';
import { ICON_DELETE, ICON_KEYBOARD } from 'ngx-touch-virtual-keyboard';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
  providers: [
    { provide: ICON_DELETE, useValue: 'assets/icons/bugs.svg' },
    { provide: ICON_KEYBOARD, useValue: 'assets/icons/bugs.svg' },
  ],
})
export class CustomComponent {
  inputValue: string = '';
}
