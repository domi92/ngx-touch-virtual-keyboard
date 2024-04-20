![image](https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/d29c0624-a178-4e7a-84ae-4e70214544e1)# NgxTouchVirtualKeyboard

Simple angular virtual keyboard component.

# Versions

| Library | Angular compatibility | Type   |
| :------ | --------------------- | ------ |
| ^16.x.x | ^16.0.0, ^17.0.0      | 🟢 LTS |
| ^15.x.x | ^15.0.0               | 🔴 EOL |

Version 15 is not planned to get further updates

# Overview

Simple virtual keyboard that inteact with common input elements. Supports multiple input type with different layout automatically applied.

Possibile to customize:

- language layout fully customizable. Create multiple language-layout and dynamically change it
- customize button icons and key positions providing a custom layout/theme

Main features:

- easy to configure: Add keyboard component to you application and use one directive on input element that need to use virtual keyboard
- automatic open/close on intem selection
- automatic different layout for different input type (text, number, password, tel)
- integration with phisical keyboard to use simultaneously (shift and capsLock works simultaneously as for cursor position)
- integrated tab (shift + tab) navigation
- button pressed repeat action automatically
- integrated text area in component to always keep visible input text (small screen eseful if keyboard covers input element)

<div align="center">
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/e90627d4-91c0-448d-92c8-554ce26dd051" width=45%/>
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/56631432-4978-4648-a734-f0d6e3610da9" width=45%/>
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/a5e1efcf-d7b9-4341-b1ca-11a31c2cd076" width=45%/>
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/f687a93c-e4eb-41d3-9869-eaea97c10a77" width=45%/>
</div>

# Install

Install package (console) and import module (in app.module.ts)

```bash
npm i ngx-touch-virtual-keyboard
```

```typescript

@NgModule({
  imports: [
    ...
    NgxTouchVirtualKeyboardModule
  ],
  ..
})
```

⚠️ **Continue adding default icons and theme**

## **Default icon loading (add assets)**

To load correctly default icons add in angular.json assets import.

Do not change the output path must be defined like that in order to use default assets from lib.

```typescript
"assets": [
            {
              "glob": "**/*",
              "input": "./node_modules/ngx-touch-virtual-keyboard/assets/",
              "output": "/assets/ngx-tvk/"
            }
          ],
```

## **Default theme**

To include theme you can

- **If customization in theme is not needed =>** add to angular.json as resource in "styles"

```typescript
"styles": [
            ...,
            "./node_modules/ngx-touch-virtual-keyboard/theme/ngx-touch-virtual-keyboard-theme.scss"]
          ],
```

- **If customization required =>** add in main styles.scss

```scss
@import './node_modules/ngx-touch-virtual-keyboard/theme/ngx-touch-virtual-keyboard-theme';
... override style here ...
```

# Usage

Inside appComponent. Add component

```typescript
<router-outlet></router-outlet>

<ngx-touch-virtual-keyboard></ngx-touch-virtual-keyboard>

```

Use directive "useVirtualKeyboard" in input component to connect input element with keyboard

```typescript
<input type="text" useVirtualKeyboard placeholder="Type here..." />
```

## Change language layout

Build in component there are just 2 simple layout ['us' and 'it']. 'US' is the deafult. A layout can be dynamically selected with @Input layout parameter.

Current language is displayed inside the space button. If input parameter is not exisitng a console error is raised and the default layout is used.

```typescript
<ngx-touch-virtual-keyboard layout="it"></ngx-touch-virtual-keyboard>

<ngx-touch-virtual-keyboard [layout]="currentLayout" toggleButton="visible"></ngx-touch-virtual-keyboard>
```

## Customize layout (define how many layout-language you need)

Define in app.module or at compoent level a new array for layouts and provide this as new layout for keyboard compoent.
This will override all default layout, but you can redefine them.

Array type is : { layout: string; values: (INGXKeyElement | string)[][] }[].

- layout usually is the language (us, gb, it, ..) or as in example can be used any string.
- values can be a simple character, or a string (.com) or an object k(v1, v2).
  - String usage is restricted since some string are used to display icon buttons (tab, shift, ...)
  - k(v1, v2) can be usde for buttons that on shift should write not capitalized letter but another char

```typescript

import { KEYBOARD_LAYOUT_DEFAULT } from 'ngx-touch-virtual-keyboard';
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
    { provide: KEYBOARD_LAYOUT_DEFAULT, useValue: defaultKeyboard },
  ],
```

Restricted string representing scpecial buttons are:

- backspace | tab | left | right | shift | space

Example from previous code (myDefault alyout is applied as default):

<div align="center">
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/c869cd3f-8636-4d33-8813-43ecd8f35ba8" width=45%/>
</div>

## Use custom icons

All icons can be changed with custom svg. Providing in app.module.ts a new svg reference for each icon to change.

ICON_BACKSPACE | ICON_ERASE | ICON_EYE_SLASH | ICON_EYE | ICON_KEYBOARD | ICON_LEFT | ICON_RIGHT | ICON_SHIFT

```typescript
import {ICON_BACKSPACE, ICON_KEYBOARD} from 'ngx-touch-virtual-keyboard';

  ...

  providers: [
    {provide: ICON_BACKSPACE, useValue: 'assets/icons/bugs.svg'},
    {provide: ICON_KEYBOARD, useValue: 'assets/icons/bugs.svg'},
  ],

```

List of all icons tahtn can be replaced

- ICON_BACKSPACE
- ICON_ERASE
- ICON_EYE_SLASH
- ICON_EYE
- ICON_KEYBOARD
- ICON_KEYBOARD_CLOSE
- ICON_LEFT
- ICON_RIGHT
- ICON_SHIFT
- ICON_TAB

Example from previous provided custom bugs.svg

<div align="center">
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/54a31fe5-bf7b-4056-b1d2-7510605180de" width=45%/>
</div>

## Customize keyobard type opened.

Each input type have a specific keyboard layout opened, for example:

- `<input type="text"/>` this will use default keyboard
- `<input type="number"/>` this will use default number

This is the current supported type. If not changed each time an input with this type is selected specific layout keyboard is opend

```typescript
const mapInputLayout: { inputType: MapInputType; keyboardType: MapKeyboardType }[] = [
  { inputType: 'text', keyboardType: 'default' },
  { inputType: 'url', keyboardType: 'default' },
  { inputType: 'email', keyboardType: 'email' },
  { inputType: 'password', keyboardType: 'password' },
  { inputType: 'number', keyboardType: 'number' },
  { inputType: 'range', keyboardType: 'number' },
  { inputType: 'tel', keyboardType: 'tel' },
];
```

### Override type on single element

On input element after marked it with directive "useVirtualKeyboard", jsut force the layoutType with setKeyboardType="..."

This example will "email" keyboard also if type is text.

```typescript
<input type="text" useVirtualKeyboard setKeyboardType="email" placeholder="Type email here..." />
```

### Override at application level

It is possible to override the KEYBOARD_MAP_INPUT_TO_LAYOUT with a custom mapping. This will open automatically for all input type the numeric layout keyboard

```typescript
 providers: [
    {
      provide: KEYBOARD_MAP_INPUT_TO_LAYOUT,
      useValue: [
        { inputType: 'text', keyboardType: 'number' },
        { inputType: 'url', keyboardType: 'number' },
        { inputType: 'email', keyboardType: 'number' },
        { inputType: 'password', keyboardType: 'number' },
        { inputType: 'number', keyboardType: 'number' },
        { inputType: 'range', keyboardType: 'number' },
        { inputType: 'tel', keyboardType: 'number' },
      ],
    },
  ],
```

## Customize theme

Theme can be customized. All useful parameter are defined in projects/ngx-touch-virtual-keyboard/theme/ngx-touch-virtual-keyboard-theme.scss

Below just an example how to locally override variables.
Always reference to this file for complete list. If some variable is missing just opene a change request

```scss
@import './node_modules/ngx-touch-virtual-keyboard/theme/ngx-touch-virtual-keyboard-theme';
  //keys
:host {
  --ngx-tvk-key-background-color: darkgray;
  --ngx-tvk-key-background-color-hover: orange;
  --ngx-tvk-key-border-color-pressed: white;
}
...
```

<div align="center">
<img src="https://github.com/domi92/ngx-touch-virtual-keyboard/assets/10332144/2ec641fe-0af2-4169-af80-0dbc345cf786" width=45%/>
</div>

## Customize toggle button (show-hide keyboard)

### Visibility

Input parameter toggleButton: 'dynamic' | 'hidden' | 'visible'. can be used to control default toggle button visibility.
Can be changed to always visible or hidden.

Default dynamic is evaluating if any visible element is requesting keyboard and adapt visibility if some element use "useVirtualKeyboard" directive

# Versionning

##### Changelog 16.1.0

###### New Features:

- Toggle button visibility. @Input() toggleButton: 'dynamic' | 'hidden' | 'visible';
  - change visibility behaviour of toggle button. Before was always visible not optional

##### Changelog 16.0.0

New release version for angular16 and further compatibility

##### Changelog 15.0.0

Released all functionality for angular15 compatibility

##### Changelog 1.2.0

###### New Features:

- theme customization. All style can be customized overriding default .scss variables

###### Enhancements:

- keyboard layout changed get property with Observable usage
- arrow left/right are working better than before when used with a keyboard

###### Bug Fixes:

- white space are displayed correctly

###### Breaking change

-KEYBOARD_LAYOUT renamed in KEYBOARD_LAYOUT_DEFAULT
