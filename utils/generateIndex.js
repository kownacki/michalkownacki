import fs from 'fs';
import _ from 'lodash/fp.js';
import materialColors from 'material-colors';
import {noopTag} from 'mk-js-utils';
import {apiKey, headerHeight, namePrefix} from '../config.js';
import analyticsScript from './generateIndex/analyticsScript.js';
import preRender from './generateIndex/preRender.js';
import preloadFirebaseAndApp from './generateIndex/preloadFirebaseAndApp.js';
import initializeFirebaseAndApp from './generateIndex/initializeFirebaseAndApp.js';

// to trigger syntax highlighting
const css = noopTag(_);

const title = 'Michał Kownacki';
const faviconPath = '/resources/images/favicon.ico';
const fontsRootPath =  '/resources/fonts/';
const fonts = [
  {family: 'Muli', style: 'normal', weight: '400', path: `${fontsRootPath}Muli/Muli-Regular.ttf`},
  {family: 'Muli', style: 'italic', weight: '400', path: `${fontsRootPath}Muli/Muli-Italic.ttf`},
  {family: 'Muli', style: 'normal', weight: '300', path: `${fontsRootPath}Muli/Muli-Light.ttf`},
  {family: 'Muli', style: 'italic', weight: '300', path: `${fontsRootPath}Muli/Muli-LightItalic.ttf`},
  {family: 'Muli', style: 'normal', weight: '700', path: `${fontsRootPath}Muli/Muli-Bold.ttf`},
  {family: 'Muli', style: 'italic', weight: '700', path: `${fontsRootPath}Muli/Muli-BoldItalic.ttf`},
];
const scriptsRootPath =  '/resources/scripts/';
const scripts = [
  {path: `${scriptsRootPath}lodashBundle.js`, module: true},
];
const firebaseRootPath = '/__/firebase/7.11.0/';
const firebaseLibs = ['app', 'auth', 'firestore', 'storage'];
const firebaseInitializeOptions = {
  apiKey,
  authDomain: "pl-michalkownacki.firebaseapp.com",
  databaseURL: "https://pl-michalkownacki.firebaseio.com",
  projectId: "pl-michalkownacki",
  storageBucket: "pl-michalkownacki.appspot.com",
  messagingSenderId: "132975869973",
  appId: "1:132975869973:web:b434bd48d9a967c2"
};

const indexHtml = `
<!doctype html>
<html lang="pl">
<head>
  ${analyticsScript}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${title}</title>
  <meta name="description">
  
  <link rel="shortcut icon" href="${faviconPath}">
  ${'' /*todo don't use external sources */}
  <link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">
  
  ${_.map((font) => `
    <link rel="preload" href="${font.path}" as="font" crossorigin="anonymous">
  `, fonts).join('')}
  ${_.map((script) => `
    <link rel="preload" href="${script.path}" as="script" ${script.module ? 'crossorigin="anonymous"' : ''}>
  `, scripts).join('')}
  ${preloadFirebaseAndApp(namePrefix, firebaseRootPath, firebaseLibs)}
  <link rel="preload" href="/src/styles/shared-styles.js" as="script" crossorigin="anonymous">
  <link rel="preload" href="/src/styles/ck-content.js" as="script" crossorigin="anonymous">
  
  <style>
    html, body {
      height: 100%;
    }
    body {
      margin: 0;
      --primary-color: #7986cb;
      --primary-color-rgb: 121, 134, 203;
      --secondary-color: #263238;
      --secondary-color-rgb: 117, 117, 117;
      --text-color: var(--secondary-color);
      --placeholder-color: ${materialColors.grey['500']}; /* md-grey-500 */
      --placeholder-color-rgb: 158, 158, 158;
      --divider-color: rgba(0, 0, 0, 0.12);
      --grey-text: rgba(0, 0, 0, 0.6);
      --error-color: ${materialColors.red['800']}; /* md-red-800 */
      --correct-color: ${materialColors.green['800']}; /* md-green-800 */
      --logotype-color: #84979e;
      --logotype-color-filter: invert(73%) sepia(6%) saturate(853%) hue-rotate(150deg) brightness(91%) contrast(79%);
      --header-height: ${headerHeight}px;
      --layer-header: 100;
      --layer-header-1: 101;
      --layer-profitroom: 999; /* Profitroom snippet layer*/
      --layer-profitroom-1: 1000;
      font-family: 'Muli', sans-serif;
      color: var(--text-color);
      /* MWC theming. See https://github.com/material-components/material-web/blob/master/docs/theming.md */
      --mdc-theme-primary: var(--primary-color);
      --mdc-theme-secondary: var(--secondary-color);
      /* mkwc */
      --mkwc-editable-image-icon-button-shadow-color: var(--divider-color);
      --mkwc-editable-text-font-available-color: var(--primary-color);
    }
    ${_.map((font) => css`
      @font-face {
        font-family: '${font.family}';
        font-style: ${font.style};
        font-weight: ${font.weight};
        font-display: swap;
        src: url(${font.path}) format('truetype');
      }
    `, fonts).join('')}
  </style>
</head>
<body>
  <${namePrefix}-app>
    ${preRender}
  </${namePrefix}-app>
  
  ${_.map((script) => `
    <script src="${script.path}" ${script.module ? 'type="module"' : ''}></script>
  `, scripts).join('')}

  ${initializeFirebaseAndApp(namePrefix, firebaseInitializeOptions, firebaseRootPath, firebaseLibs)}
    
  <style id="inline-style"></style>
  <script type="module">
    import sharedStyles from '/src/styles/shared-styles.js';
    import ckContent from '/src/styles/ck-content.js';
    const style = document.getElementById('inline-style');
    style.innerHTML += '\\n' + sharedStyles.cssText + '\\n' + ckContent.cssText;
  </script>
  </body>
</html>
`;

fs.writeFileSync('index.html', indexHtml);
