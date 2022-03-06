import {LitElement, html, css} from 'lit';
import {removeHtml} from 'mk-frontend-web-utils/removeHtml.js';
import dbSyncMixin from 'mkwc/dbSyncMixin.js';
import sharedStyles from '../styles/shared-styles.js';
import fb from '../utils/firebase.js';
import setDocumentDescription from '../utils/setDocumentDescription.js';
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
  updated(changedProperties) {
    if (changedProperties.has('ready') && this.ready) {
      setDocumentDescription(removeHtml(_.get('heading', this._page), ' '));
    }
    super.updated(changedProperties);
  }
  getData(path) {
    return fb.get(path);
  }
  static get styles() {
    return [sharedStyles, css`
      mk-section {
        margin: 80px 0;
      }
    `];
  }
  render() {
    return html`
      <mk-banner
        .uid=${'landing'}
        .headingPath=${this.path && this.path.extend('heading')}
        .heading=${_.get('heading', this._page)}
        .ready=${this.ready}>
      </mk-banner>
      ${_.map((section) => html`
        <mk-section
          .uid=${section}
          .path=${this.path && this.path.extend(`sections.${section}`)}
          .section=${_.get(`sections.${section}`, this._page)}
          .ready=${this.ready}>
        </mk-section>
      `, ['projects', 'how-i-create', 'cms', 'contact'])}
    `;
  }
});
