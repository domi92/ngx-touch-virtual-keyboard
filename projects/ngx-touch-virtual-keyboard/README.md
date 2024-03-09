# NgxTouchVirtualKeyboard

Simple angular virtual keyboard component.

# Overview

Simple virtual keyboard that inteact with common input elements. Supports multipl input type with different layout automatically applied.

<div align="center">
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/e90627d4-91c0-448d-92c8-554ce26dd051" width=45%/>
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/56631432-4978-4648-a734-f0d6e3610da9" width=45%/>
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/a5e1efcf-d7b9-4341-b1ca-11a31c2cd076" width=60%/>
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

## Use custom icons

All icons can be changed with custom svg. Providing in app.module.ts a new svg reference for each icon.

ICON_BACKSPACE | ICON_ERASE | ICON_EYE_SLASH | ICON_EYE | ICON_KEYBOARD | ICON_LEFT | ICON_RIGHT | ICON_SHIFT | KEYBOARD_LAYOUT

```typescript
import {ICON_BACKSPACE, ICON_KEYBOARD} from 'ngx-touch-virtual-keyboard';

  ...

  providers: [
    {provide: ICON_BACKSPACE, useValue: 'assets/icons/bugs.svg'},
    {provide: ICON_KEYBOARD, useValue: 'assets/icons/bugs.svg'},
  ],

```

Example from previous provided custom svg BUGs

<div align="center">
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/54a31fe5-bf7b-4056-b1d2-7510605180de" width=45%/>
</div>

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

TODO..
