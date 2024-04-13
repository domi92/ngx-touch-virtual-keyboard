import { INGXKeyElement, k } from './ngx-key-element';

export type MapInputType = 'text' | 'password' | 'number' | 'email' | 'url' | 'range' | 'tel';
export type MapKeyboardType = 'default' | 'number' | 'password' | 'tel' | 'email';

export enum InputTypes {
  Text,
  Password,
  Number,
  Date,
  Time,
  Email,
  Url,
  File,
  Range,
  Search,
  Tel,
  Month,
  Week,
}

export type KeyboardType = 'full' | 'number' | 'password';

export const defaultKeyboard: { layout: string; values: (INGXKeyElement | string)[][] }[] = [
  {
    layout: 'us',
    values: [
      [
        k('`', '~'),
        k('1', '!'),
        k('2', '@'),
        k('3', '#'),
        k('4', '$'),
        k('5', '%'),
        k('6', '^'),
        k('7', '&'),
        k('8', '*'),
        k('9', '('),
        k('0', ')'),
        k('-', '_'),
        k('=', '+'),
        'backspace',
      ],
      ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', k(',', ';'), k('.', ':'), k('-', '_'), 'shift'],
      ['space', 'left', 'right'],
    ],
  },
  {
    layout: 'it',
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
        k('ì', '^'),
        'backspace',
      ],
      ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', k('è', 'é'), k('+', '*')],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', k('ò', 'ç'), k('à', '°'), k('ù', '§')],
      ['shift', k('<', '>'), 'z', 'x', 'c', 'v', 'b', 'n', 'm', k(',', ';'), k('.', ':'), k('-', '_'), 'shift'],
      ['space', 'left', 'right'],
    ],
  },
];

export const emailKeyboard: { layout: string; values: (INGXKeyElement | string)[][] }[] = [
  {
    layout: 'us',
    values: [
      [
        k('`', '~'),
        k('1', '!'),
        k('2', '@'),
        k('3', '#'),
        k('4', '$'),
        k('5', '%'),
        k('6', '^'),
        k('7', '&'),
        k('8', '*'),
        k('9', '('),
        k('0', ')'),
        k('-', '_'),
        k('=', '+'),
        'backspace',
      ],
      ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', k(',', ';'), k('.', ':'), k('-', '_'), 'shift'],
      ['space', '@', '.com', 'left', 'right'],
    ],
  },
  {
    layout: 'it',
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
        k('ì', '^'),
        'backspace',
      ],
      ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', k('è', 'é'), k('+', '*')],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', k('ò', 'ç'), k('à', '°'), k('ù', '§')],
      ['shift', k('<', '>'), 'z', 'x', 'c', 'v', 'b', 'n', 'm', k(',', ';'), k('.', ':'), k('-', '_'), 'shift'],
      ['space', '@', '.com', 'left', 'right'],
    ],
  },
];

export const numberKeyboard = [
  {
    layout: 'us',
    values: [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['.', '0', 'backspace'],
    ],
  },
  {
    layout: 'it',
    values: [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      [',', '0', 'backspace'],
    ],
  },
];

export const telKeyboard = [
  {
    layout: 'us',
    values: [
      ['1', '2', '3', ''],
      ['4', '5', '6', ''],
      ['7', '8', '9', ''],
      ['#', '0', '+', 'backspace'],
    ],
  },
];

export const dateKeyboard = [
  {
    layout: 'us',
    values: [
      ['', '1', '2', '3', ''],
      ['', '4', '5', '6', ''],
      ['', '7', '8', '9', ''],
      ['-', '0', 'left', 'right', 'backspace'],
    ],
  },
];

export const mapInputLayout: { inputType: MapInputType; keyboardType: MapKeyboardType }[] = [
  { inputType: 'text', keyboardType: 'default' }, //KEYBOARD_LAYOUT_DEFAULT
  { inputType: 'url', keyboardType: 'default' }, //KEYBOARD_LAYOUT_DEFAULT
  { inputType: 'email', keyboardType: 'email' },
  { inputType: 'password', keyboardType: 'password' },
  { inputType: 'number', keyboardType: 'number' },
  { inputType: 'range', keyboardType: 'number' },
  { inputType: 'tel', keyboardType: 'tel' },
];
