# NgxTouchVirtualKeyboard

Simple angular virtual keyboard component.

# VSCode IDE setup

!!! edit IDE to execute eslint on save to keep code clean !!!

"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
}

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
