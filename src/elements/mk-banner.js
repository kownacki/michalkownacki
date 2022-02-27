import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js'
import fb from '../utils/firebase.js';
import './mk-heading.js';

customElements.define('mk-banner', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      headingPath: fb.Path,
      heading: Object,
      ready: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--secondary-color);
      }
      .heading {
        color: white;
      }
    `];
  }
  render() {
    return html`
      <mk-heading
        class="content-heading heading"
        .level=${1}
        .path=${this.headingPath}
        .text=${this.heading}
        .rich=${true}
        .ready=${this.ready}>
      </mk-heading>
    `;
  }
});
