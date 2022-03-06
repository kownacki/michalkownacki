import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import loggedInMixin from '../utils/loggedInMixin.js';

customElements.define('mk-content-label', class extends loggedInMixin('_loggedIn', LitElement) {
  static get properties() {
    return {
      name: String,
      _loggedIn: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: none;
        position: absolute;
        bottom: 100%;
        left: 0;
      }
    `];
  }
  constructor() {
    super();
    this.classList.add('smaller-text');
  }
  render() {
    return html`
      ${this._loggedIn ? this.name : ''}
    `;
  }

});
