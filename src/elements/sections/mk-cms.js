import {LitElement, html, css} from 'lit-element';
import '@material/mwc-button';
import sharedStyles from '../../styles/shared-styles.js';
import fb from '../../utils/firebase.js';
import '../mk-article.js';
import '../mk-heading.js';
import '../mkwc/mk-text.js';

export default class MkCms extends LitElement {
  static get properties() {
    return {
      path: fb.Path,
      section: Object,
      ready: Boolean,
      _editingEnabled: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
      }
      .see-it-in-action {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      mk-text {
        max-width: 700px;
        padding: 0 20px;
        margin: 20px 0;
      }
      p {
        margin: 0;
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
      <mk-heading
        class="content-heading"
        .level=${3}
        .path=${this.path && this.path.extend('editing.heading')}
        .text=${_.get('editing.heading', this.section)}
        .ready=${this.ready}>
      </mk-heading>
      <div class="see-it-in-action">
        <mwc-button raised label="${this._editingEnabled ? 'Stop' : 'Start'} editing this website" @click=${() => {
          this._editingEnabled = !this._editingEnabled;
          window.dispatchEvent(new CustomEvent('toggle-editing', {detail: this._editingEnabled}))
        }}>
      </mwc-button>
      <mk-text
        ?hidden=${!this._editingEnabled}
        .path=${this.path && this.path.extend('editing.enabledText')}
        .noGet=${true}
        .text=${_.get('editing.enabledText', this.section)}
        .ready=${this.ready}>
          <p></p>
      </mk-text>
    </div>
    `;
  }
}
customElements.define('mk-cms', MkCms);
