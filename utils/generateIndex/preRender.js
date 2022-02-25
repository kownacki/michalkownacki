import {loadingDots} from 'mk-frontend-web-utils/loadingDots.js';

export default `
  <style>
    ${loadingDots.css()}
  </style>
  ${loadingDots.html(`<noscript>Enabled JavaScript is required to view the page.</noscript>`)}
`;
