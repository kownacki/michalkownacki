window.auth = firebase.auth();
window.db = firebase.firestore();
window.storage = firebase.storage();

auth.onAuthStateChanged((user) => {window.loggedIn = Boolean(user)});

import {LitElement, html, css} from 'lit';
import sharedStyles from './styles/shared-styles.js';
import './elements/mk-header.js';
import './elements/mk-page.js';

customElements.define('mk-app', class extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return sharedStyles;
  }
  render() {
    return html`
      <mk-header
        id="header"
        @open-drawer=${() => this.shadowRoot.getElementById('drawer').open()}>
      </mk-header>
      <mk-page .uid=${'landing'}></mk-page>
    `;
  }
});
