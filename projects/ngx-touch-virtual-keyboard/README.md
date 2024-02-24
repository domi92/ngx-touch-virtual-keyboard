# NgxTouchVirtualKeyboard

Simple angular virtual keyboard component.

# Install

## Default icon loading

To load correclty default icons add in angular.json assets import.

Do not change the output path must be defined like that

```
"assets": [
            {
              "glob": "**/*",
              "input": "./node_modules/ngx-touch-virtual-keyboard/assets/",
              "output": "/assets/ngx-tvk/"
            }
          ],
```

## Use custom icons
All icons can be changed with custom svg. Providing in app.module.ts a new svg reference for each icon
ICON_DELETE | ICON_ERASE | ICON_EYE_SLASH | ICON_EYE | ICON_KEYBOARD | ICON_LEFT | ICON_RIGHT | ICON_SHIFT | KEYBOARD_LAYOUT

```
import {ICON_DELETE, ICON_KEYBOARD} from 'ngx-touch-virtual-keyboard';

  ...
  
  providers: [
    {provide: ICON_DELETE, useValue: 'assets/icons/bugs.svg'},
    {provide: ICON_KEYBOARD, useValue: 'assets/icons/bugs.svg'},
  ],

```

# Usage

Inside appComponent. Add component

```
<router-outlet></router-outlet>

<ngx-touch-virtual-keyboard></ngx-touch-virtual-keyboard>

```

Use directive useVirtualKeyboard in input component to connect input element with keyboard

```
<input type="text" useVirtualKeyboard [isNumericOnly]="false" placeholder="Type here..." />
```

TODO..
