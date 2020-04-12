import {LitElement, html, css} from 'lit-element';
import dbSyncMixin from 'mkwc/dbSyncMixin.js';
import sharedStyles from '../styles/shared-styles.js';
import fb from '../utils/firebase.js';
import './mk-banner.js';
import './mk-section.js';

customElements.define('mk-page', class extends dbSyncMixin('_page', LitElement) {
  static get properties() {
    return {
      uid: String,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this.path = fb.path(`pages/${this.uid}`);
    })();
  }
  getData(path) {
    return fb.get(path);
  }
  static get styles() {
    return [sharedStyles, css`
    `];
  }
  render() {
    return html`
      <mk-banner .uid=${'landing'}></mk-banner>
      ${_.map((section) => html`
        <mk-section
          .uid=${section}
          .path=${this.path && this.path.extend(`sections.${section}`)}
          .section=${_.get(`sections.${section}`, this._page)}
          .ready=${this.ready}>
        </mk-section>
      `, ['projects', 'how-i-create', 'contact'])}
    `;
  }
});
