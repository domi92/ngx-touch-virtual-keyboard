import { InjectionToken } from '@angular/core';
import { INGXKeyElement, k } from './ngx-key-element';

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
      ['', '0', '+', 'backspace'],
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

// export class InputTypes {
//   static readonly TEXT = 'text';
//   static readonly PASSWORD = 'password';
//   static readonly CHECKBOX = 'checkbox';
//   static readonly RADIO = 'radio';
//   static readonly SUBMIT = 'submit';
//   static readonly RESET = 'reset';
//   static readonly FILE = 'file';
//   static readonly HIDDEN = 'hidden';
//   static readonly IMAGE = 'image';
//   static readonly BUTTON = 'button';
//   static readonly DATE = 'date';
//   static readonly DATETIME_LOCAL = 'datetime-local';
//   static readonly TIME = 'time';
//   static readonly EMAIL = 'email';
//   static readonly NUMBER = 'number';
//   static readonly RANGE = 'range';
//   static readonly SEARCH = 'search';
//   static readonly TEL = 'tel';
//   static readonly URL = 'url';
//   static readonly COLOR = 'color';
//   static readonly MONTH = 'month';
//   static readonly WEEK = 'week';
// }

export class NGXConfigurationKeyboard {
  mapping!: Map<InputTypes, InjectionToken<INGXKeyElement[][]>>;
}
