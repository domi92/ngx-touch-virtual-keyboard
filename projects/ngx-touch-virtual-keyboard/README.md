# NgxTouchVirtualKeyboard

Simple angular virtual keyboard component.

# VSCode IDE setup

!!! edit IDE to execute eslint on save to keep code clean !!!

"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
}

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
