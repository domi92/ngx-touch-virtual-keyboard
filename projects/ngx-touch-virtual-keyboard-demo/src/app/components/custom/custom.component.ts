import { Component } from '@angular/core';
import { ICON_BACKSPACE, ICON_KEYBOARD, KEYBOARD_LAYOUT } from 'ngx-touch-virtual-keyboard';
import { INGXKeyElement, k } from 'ngx-touch-virtual-keyboard';

const defaultKeyboard: { layout: string; values: (INGXKeyElement | string)[][] }[] = [
  {
    layout: 'myCustom',
    values: [
      [
        k('\\', '|'),
        k('1', '!'),
        k('2', '"'),
        k('3', '£'),
        k('4', '$'),
        k('5', '%'),
        k('6', '&'),
        k('7', '/'),
        k('8', '('),
        k('9', ')'),
        k('0', '='),
        k("'", '?'),
        'backspace',
      ],
      ['tab', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['shift', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', k(',', ';'), k('.', ':'), k('-', '_'), 'shift'],
      ['space', 'left', 'right'],
    ],
  },
];

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
  providers: [
    { provide: ICON_BACKSPACE, useValue: 'assets/icons/bugs.svg' },
    { provide: ICON_KEYBOARD, useValue: 'assets/icons/bugs.svg' },
    { provide: KEYBOARD_LAYOUT, useValue: defaultKeyboard },
  ],
})
export class CustomComponent {
  inputValue: string = '';
}
