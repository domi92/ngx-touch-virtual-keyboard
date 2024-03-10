# NgxTouchVirtualKeyboard

Simple angular virtual keyboard component.

# Overview

Simple virtual keyboard that inteact with common input elements. Supports multiple input type with different layout automatically applied.

Possibile to customize:

- language layout fully customizable. Create multiple language-layout and dynamically change it
- customize button icons and key positions providing a custom layout
- todo others...

Main features:

- automatic open/close on intem selection
- automatic different layout for different input type (text, number, password, email, ...)
- integration with phisical keyboard to use simultaneously (shift and capsLock works simultaneously as for cursor position)
- integrated tab (shift + tab) navigation
- button pressed repeat action automatically
- integrated text area in component to always keep visible input text (small screen eseful if keyboard covers input element)
- todo others...

<div align="center">
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/e90627d4-91c0-448d-92c8-554ce26dd051" width=45%/>
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/56631432-4978-4648-a734-f0d6e3610da9" width=45%/>
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/a5e1efcf-d7b9-4341-b1ca-11a31c2cd076" width=45%/>
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/f687a93c-e4eb-41d3-9869-eaea97c10a77" width=45%/>
</div>

# Install

## Default icon loading

To load correctly default icons add in angular.json assets import.

Do not change the output path must be defined like that in order to use default assets from lib

```typescript
"assets": [
            {
              "glob": "**/*",
              "input": "./node_modules/ngx-touch-virtual-keyboard/assets/",
              "output": "/assets/ngx-tvk/"
            }
          ],
```

# Usage

Inside appComponent. Add component

```typescript
<router-outlet></router-outlet>

<ngx-touch-virtual-keyboard></ngx-touch-virtual-keyboard>

```

Use directive useVirtualKeyboard in input component to connect input element with keyboard

```typescript
<input type="text" useVirtualKeyboard placeholder="Type here..." />
```

## Change language layout

Build in component there are just 2 simple layout ['us' and 'it']. 'US' is the deafult. A layout can be dynamically selected with @Input layout parameter.

Current language is displayed inside the space button. If input parameter is not exisitng a console error is raised and the default layout is used.

```typescript
<ngx-touch-virtual-keyboard layout="it"></ngx-touch-virtual-keyboard>

<ngx-touch-virtual-keyboard [layout]="currentLayout"></ngx-touch-virtual-keyboard>
```

## Customize layout (define how many layout you need)

Define in app.module or at compoent level a new array for layouts and provide this as new layout for keyboard compoent.
This will override all default layout, but you can redefine them.

Array type is : { layout: string; values: (INGXKeyElement | string)[][] }[].

- layout usually is the language (us, gb, it, ..) or as in example can be used any string.
- values can be a simple character, or a string (.com) or an object k(v1, v2).
  - String usage is restricted since some string are used to display icon buttons (tab, shift, ...)
  - k(v1, v2) can be usde for buttons that on shift should write not capitalized letter but another char

```typescript

import { KEYBOARD_LAYOUT } from 'ngx-touch-virtual-keyboard';
import { INGXKeyElement, k } from 'ngx-touch-virtual-keyboard';

const defaultKeyboard: { layout: string; values: (INGXKeyElement | string)[][] }[] = [
  {
    layout: 'myCustom',
    values: [
      [
        k('\\', '|'), k('1', '!'), k('2', '"'), k('3', '£'), k('4', '$'), k('5', '%'), k('6', '&'),
        k('7', '/'), k('8', '('), k('9', ')'), k('0', '='), k("'", '?'),'backspace',
      ],
      ['tab', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      ['shift', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', k(',', ';'), k('.', ':'), k('-', '_'), 'shift'],
      ['space', 'left', 'right'],
    ],
  },
  {
   layout: 'gb',
   values: [ .... ],
  }
];

 providers: [
    { provide: KEYBOARD_LAYOUT, useValue: defaultKeyboard },
  ],
```

Example from previous code (myDefault alyout is applied as default):

<div align="center">
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/c869cd3f-8636-4d33-8813-43ecd8f35ba8" width=45%/>
</div>

## Use custom icons

All icons can be changed with custom svg. Providing in app.module.ts a new svg reference for each icon to change.

ICON_BACKSPACE | ICON_ERASE | ICON_EYE_SLASH | ICON_EYE | ICON_KEYBOARD | ICON_LEFT | ICON_RIGHT | ICON_SHIFT | KEYBOARD_LAYOUT

```typescript
import {ICON_BACKSPACE, ICON_KEYBOARD} from 'ngx-touch-virtual-keyboard';

  ...

  providers: [
    {provide: ICON_BACKSPACE, useValue: 'assets/icons/bugs.svg'},
    {provide: ICON_KEYBOARD, useValue: 'assets/icons/bugs.svg'},
  ],

```

Example from previous provided custom bugs.svg

<div align="center">
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/54a31fe5-bf7b-4056-b1d2-7510605180de" width=45%/>
</div>
