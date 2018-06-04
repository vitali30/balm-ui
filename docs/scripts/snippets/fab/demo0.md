Default Usage

```js
import Vue from 'vue';
import BalmUI from 'balm-ui';

Vue.use(BalmUI, {
  // (Optional) Overwrite <ui-fab> props
  UiFab: {
    // some props
  }
});
```

Standalone Usage

```js
import Vue from 'vue';
import UiFab from 'balm-ui/components/fab';

// (Recommended) Splitting CSS out from the main application, see BalmUI advanced usage
import 'balm-ui/components/core.css';
import 'balm-ui/components/fab.css';
import 'balm-ui/components/icon.css';

// (Optional) Overwrite <ui-fab> props
UiFab.config({
  // some props
});

Vue.component(UiFab.name, UiFab);
```