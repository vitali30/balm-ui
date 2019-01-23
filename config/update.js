const { src, dest, task, series } = require('gulp');
const $replace = require('gulp-replace');

const mdcDir = './src/material-components-web/';
const level0 = ['material-components-web.scss'];
const level1 = [
  'button',
  'card',
  'checkbox',
  'chips',
  'dialog',
  'drawer',
  'elevation',
  'fab',
  'floating-label',
  'form-field',
  'grid-list',
  'icon-button',
  'icon-toggle',
  'image-list',
  'line-ripple',
  'linear-progress',
  'list',
  'menu',
  'menu-surface',
  'notched-outline',
  'radio',
  'ripple',
  'select',
  'selection-control',
  'slider',
  'snackbar',
  'switch',
  'tab',
  'tab-bar',
  'tab-indicator',
  'tab-scroller',
  'textfield',
  'toolbar',
  'top-app-bar'
];
const level2 = [
  'chips/chip',
  'chips/chip-set',
  // 'drawer/permanent',
  // 'drawer/persistent',
  // 'drawer/slidable',
  // 'drawer/temporary',
  'drawer/dismissible',
  'drawer/modal',
  'select/helper-text',
  'select/icon',
  // 'tabs/tab',
  // 'tabs/tab-bar',
  // 'tabs/tab-bar-scroller',
  'textfield/helper-text',
  'textfield/icon'
];

let index = 0;
let updateMDCTasks = [];

level0.forEach(function(file) {
  let name = `update:mdc:${index}`;
  task(name, () => {
    return src(mdcDir + file)
      .pipe($replace('@material/', './'))
      .pipe(dest(mdcDir));
  });
  updateMDCTasks.push(name);
  index++;
});

level1.forEach(function(file) {
  let name = `update:mdc:${index}`;
  task(name, () => {
    return src(mdcDir + file + '/*')
      .pipe($replace('@material/', '../'))
      .pipe(dest(mdcDir + file));
  });
  updateMDCTasks.push(name);
  index++;
});

level2.forEach(function(file) {
  let name = `update:mdc:${index}`;
  task(name, () => {
    return src(mdcDir + file + '/*')
      .pipe($replace('@material/', '../../'))
      .pipe(dest(mdcDir + file));
  });
  updateMDCTasks.push(name);
  index++;
});

task('update:mdc', series(updateMDCTasks));
