import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js';
import fb from '../../utils/firebase.js';
import '../mk-article.js';
import '../mk-heading.js';
import('./mk-contact/mk-contact-form.js');

export default class MkContact extends LitElement {
  static get properties() {
    return {
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
      <mk-contact-form></mk-contact-form>
      <mk-heading
        class="content-heading"
        .level=${3}
        .path=${this.path && this.path.extend('direct.heading')}
        .text=${_.get('direct.heading', this.section)}
        .ready=${this.ready}>
      </mk-heading>
      <mk-article
        .path=${this.path && this.path.extend('direct.article')}
        .text=${_.get('direct.article', this.section)}
        .ready=${this.ready}
        .rich=${true}
        .richConfig=${'mosaic'}>
      </mk-article>
    `;
  }
}
customElements.define('mk-contact', MkContact);
