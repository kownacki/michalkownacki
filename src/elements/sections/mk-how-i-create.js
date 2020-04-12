import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../styles/shared-styles.js';
import fb from '../../utils/firebase.js';
import '../mk-article.js';

export default class MkHowICreate extends LitElement {
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
      <mk-article
        .path=${this.path && this.path.extend('article')}
        .text=${_.get('article', this.section)}
        .ready=${this.ready}
        .rich=${true} 
        .richConfig=${'mosaic'}>
      </mk-article>
    `;
  }
}
customElements.define('mk-how-i-create', MkHowICreate);
