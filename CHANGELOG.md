# [BalmUI](https://material.balmjs.com) ChangeLog

> :tada: [`balm-ui@next`](https://github.com/balmjs/balm-ui/tree/9.x)(v9.0) supports for Vue 3.0

## v8.12.0 / 2020-12-09

### Features

- `<ui-autocomplete>`: add `highlight` prop
- `<ui-select>`: add `fixed` prop for overflow inside of some component

### Bug Fixes

- `<ui-autocomplete>`: optimize and improve search function

## v8.11.0 / 2020-12-07

### Features

- `<ui-pagination>`: add default slot for custom pagesize area info

### Reverts

- restore `<ui-select>` css for the component inside of `<ui-dialog>`

## v8.10.0 / 2020-12-01

### Features

- `<ui-dialog-title>`: add `closable` prop
- `<ui-autocomplete>`: add `sourceFormat` prop

### Bug Fixes

- `<ui-rangepicker>`: fix second input onChange bug for rangePlugin

## v8.9.2 / 2020-11-27

### Bug Fixes

- `<ui-table>`: textfield onBlur bug in table
- `<ui-button>`: card button class bugfix

## v8.9.1 / 2020-11-25

### Bug Fixes

- `<ui-form>`: change <del>`fieldset`</del> to `div` tag for display bug

## v8.9.0 / 2020-11-24

### Features

- `<ui-editor>`: add `html` format

### Chore

- `<ui-editor>`: update toolbarTips for `align`/`list`/`indent`/`script` formats

## v8.8.0 / 2020-11-23

### Features

- `<ui-editor>`: add prop `toolbarTips`

## v8.7.3 / 2020-11-20

### Chore

- `<ui-dialog>`: update css

### Reverts

- revert floating label tag

## v8.7.2 / 2020-11-06

### Bug Fixes

- `<ui-textfield>`, `<ui-select>`: update the component inside of `<ui-form-field>` css
- `<ui-select>`: update the component inside of `<ui-dialog>` css

### Chore

- `<ui-autocomplete>`, `<ui-dialog>`: update css

### Reverts

- `<ui-select>`: deprecated `v8.7.1`

## <del>v8.7.1</del> / 2020-11-04

### Features

- `<ui-select>`: add prop <del>`fixedWidth`</del> for [mdc select bug](https://github.com/material-components/material-components-web/issues/5590)

## v8.7.0 / 2020-11-03

### Features

- update [`mdc@8.0.0`](https://github.com/material-components/material-components-web/blob/master/CHANGELOG.md#800-2020-11-02)

### BREAKING CHANGES

> sync code from BalmUI v9

- `<ui-textfield>`, `<ui-autocomplete>`, `<ui-checkbox>`, `<ui-radio>`, `<ui-file>`, `<ui-datepicker>`, `<ui-switch>`: rename prop `id` -> `inputId`

## v8.6.0 / 2020-11-01

### Code Refactoring

- `<ui-editor>`: more built-in quill extensions

### Features

- `<ui-editor>`: add prop `toolbarIcons`, `toolbarOptions`, `withCounter`
- update `mdc@8.0.0-canary.5511c5254.0`

### BREAKING CHANGES

- `<ui-editor>`: rename prop `toolbarCustomHandlers` to `toolbarHandlers`

## v8.5.1 / 2020-10-21

### Bug Fixes

- `<ui-datepicker>`: focus bugfix

### Chore

- optimize `<ui-autocomplete>` css

## v8.5.0 / 2020-10-16

- optimize `<ui-editor>`
- update `mdc@8.0.0-canary.2ab716cbd.0`

## v8.4.1 / 2020-10-14

- update `balm@3.6.0` and `mdc@8.0.0-canary.790ca85fd.0`

## v8.4.0 / 2020-10-10

- rebuild for some plugins bug in runtime mode

## v8.3.3 / 2020-10-09

- rebuild for some components bug in runtime mode

## v8.3.2 / 2020-10-05

### Bug Fixes

- `$store`: bugfix for name

## v8.3.0 / 2020-10-01

### Features

- rebuild all
  - The `Ui` prefix for components
  - The `$` prefix for plugins
  - The `v` prefix for directives
- upgrade: export all plugins for Vue Compiler/Runtime
- `$store`: optimize initialization

### BREAKING CHANGES

- `event` -> `$event`
- `grid` -> `$grid`
- `store` -> `$store`
- `theme` -> `$theme`
- `typography` -> `$typography`
- `validator` -> `$validator`
- `alert` -> `$alert`
- `confirm` ->`$confirm`
- `toast` -> `$toast`

## v8.2.5 / 2020-09-30

### BREAKING CHANGES

- remove Material Icons Sharp (Flagged: GPL-3.0-only)

## v8.2.2 / 2020-09-29

- update store plugins: remove `useStore`, use `$store` in app instance
- optimize validator: support computed `validations`

## v8.2.1 / 2020-09-29

### BREAKING CHANGES

- remove `bus` plugin and migrate to `event` plugin

## v8.2.0 / 2020-09-28

### Features

- `$bus`: update apis
  - `sub` -> `on(eventName, callback)`
  - `pub` -> `emit(eventName, ...args)`

## v8.1.1 / 2020-09-28

### Features

- `<ui-button>`: add prop `nativeType`

## v8.1.0 / 2020-09-27

### Features

- update plugins without `.vue` component:
  - `useBus`
  - `useGrid`
  - `useStore`
  - `useTheme`
  - `useTypography`
  - `useAlert`
  - `useConfirm`
  - `useToast`

## v8.0.0 / 2020-09-25

### Bug Fixes

- `<ui-table>`: fix tbody fields function bug
- `<ui-datepicker>`: fix clear event bug
- fix custom event, typography, card action, anchor and editor for SSR

### Code Refactoring

- `<ui-select>`
- `<ui-slider>`
- `<ui-pagination>`
- `$toast`: optimize option `timeoutMs`
- `$alert`
- `$confirm`
- `<ui-nav>`

### Features

- simplify Sass module usage
- update mdc@8.0.0
- update material-icons v55
- new components:
  - `<ui-banner>`
  - `<ui-tooltip>`
  - `<ui-nav-item>`
- new plugins:
  - `$bus`
  - `$store`
- `<ui-menuitem>`: add prop `value`
- `<ui-form>`: add prop `itemMarginBottom`, `labelWidth`, `labelMarginRight`, `labelMarginBottom`
- `<ui-table>`: add slot for thead cell
- `v-anchor`: optimize for dynamic html
- `$theme`: new theme apis
- `v-shape`: new shape apis
- overwrite variables become more concise and clear

  - Old

    ```scss
    @use '@material/button/variables';
    ```

  - New

    ```scss
    @use '@material/button';
    ```

### BREAKING CHANGES

- `<ui-slider>`: rename prop `displayMarker` to `withTickMarks`
- `<ui-pagination>`: optimize slots
- `<ui-menu>`: optimize selected event
- `$themeColor`, `$setTheme`, `$textColor`, `$setTextTheme`: deprecated. Use `$theme` instead.
- `<ui-nav>`: remove slot prop `itemClass`, `activeClass`

---

## [7.x](https://github.com/balmjs/balm-ui/blob/7.x/CHANGELOG.md)

## [6.x](https://github.com/balmjs/balm-ui/blob/6.x/CHANGELOG.md)

## [5.x](https://github.com/balmjs/balm-ui/blob/5.x/CHANGELOG.md)

## [4.x](https://github.com/balmjs/balm-ui/blob/4.x/CHANGELOG.md)

## [3.x](https://github.com/balmjs/balm-ui/blob/3.x/CHANGELOG.md)

## [2.x](https://github.com/balmjs/balm-ui/blob/2.x/CHANGELOG.md)

## [1.x](https://github.com/balmjs/balm-ui/blob/1.x/CHANGELOG.md)

## [0.x](https://github.com/balmjs/balm-ui/blob/0.14.x/CHANGELOG.md)
