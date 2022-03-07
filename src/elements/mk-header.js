import {LitElement, html, css} from 'lit';
import '@material/mwc-icon-button';
import './mk-header/mk-header-logo.js';

customElements.define('mk-header', class extends LitElement {
  static get properties() {
    return {
      scrolledDown: {type: Boolean, reflect: true, attribute: 'scrolled-down'},
    };
  }
  constructor() {
    super();
    window.addEventListener('scroll', _.throttle(100, () => this.scrolledDown = window.pageYOffset > 0));
  }
  static get styles() {
    return css`
      :host {
        height: var(--header-height);
        display: block;
        top: 0;
        position: fixed;
        width: 100%;
        transition: background-color 0.2s ease;
        z-index: var(--layer-header);
      }
      :host([scrolled-down]) {
        background: var(--primary-color);
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
      }
    `;
  }
  render() {
    return html`
      <header>
        <mk-header-logo .scrolledDown=${this.scrolledDown}></mk-header-logo>
      </header>
    `;
  }
});
