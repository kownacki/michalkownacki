import {LitElement, html, css} from 'lit-element';
import {staticElement} from 'mk-frontend-web-utils/lit';
import sharedStyles from '../styles/shared-styles.js';
import fb from '../utils/firebase.js';
import './mk-heading.js';
import './sections/mk-projects.js';
import './sections/mk-how-i-create.js';
import './sections/mk-cms.js';
import './sections/mk-contact.js';

customElements.define('mk-section', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      path: fb.Path,
      section: Object,
      ready: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
      }
    `];
  }
  render() {
    return html`
      <mk-heading
        class="content-heading"
        .level=${2}
        .path=${this.path && this.path.extend('heading')}
        .text=${_.get('heading', this.section)}
        .ready=${this.ready}>
      </mk-heading>
      ${this.uid && staticElement(this, this.uid, `mk-${this.uid}`, {
        path: this.path,
        section: this.section,
        ready: this.ready,
      })}
    `;
  }
});
