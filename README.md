# NgxTouchVirtualKeyboard

## Debug demo

VSCode: start debugger "Demo and library watch".

Or manually run in 2 terminal

```
ng build ngx-touch-virtual-keyboard --watch
```

AND

```
ng serve ngx-touch-virtual-keyboard-demo
```

## Build and publish github:

Implemented on main and beta branch automatic actions to build and publish.

Actions will execute on direct commit or pull requests.

Local version is compared with remote one and if not compatible then actions fails before publish on npm.

remember to update version before in pakage.json file to:
Beta: current version on npm that has to be incremented (publish is incrementing beta +1 automatically)

## Build and publish manually

Run in sequence:

+++ CHANGE VERSION +++
++ Beta

- if published with git action change version to match current version released. Beta will be incremented automatically

++Latest

- set version normally

GitHub has implemente acutomatic actions for publishing beta and latest version on beta branch on push and on main branch (on release). No manual actions should be needed

THEN ==>
for manual publishing:

```
ng build ngx-touch-virtual-keyboard

cd dist\ngx-touch-virtual-keyboard

npm publish --tag latest
OR
npm publish --tag beta

```
