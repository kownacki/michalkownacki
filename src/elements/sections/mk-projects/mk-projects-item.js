import {LitElement, html, css} from 'lit-element';
import '@material/mwc-icon'
import fb from '../../../utils/firebase.js';
import sharedStyles from '../../../styles/shared-styles.js';
import '../../mkwc/mk-image.js';

customElements.define('mk-projects-item', class extends LitElement {
  static get properties() {
    return {
      path: fb.Path,
      project: Object,
      ready: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        --border: solid 1px var(--divider-color);
      }
      .image-container {
        position: relative;
        border: var(--border);
        padding-bottom: calc(2/3 * (100% - 2px));
      }
      mk-image {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        border-radius: 4px;
      }
      .header {
        text-align: center;
        margin: 20px 0;
        padding: 0 20px;
      }
      .bottom {
        text-align: center;
        margin: 20px 0;
      }
      a {
        text-decoration: none;
        color: var(--primary-color);
        display: inline-block;
        padding: 5px 0;
      }
      a:hover {
        text-decoration: underline;
      }
      mwc-icon {
        vertical-align: bottom;
        padding-bottom: 1px;
        font-size: inherit;
      }
    `];
  }
  render() {
    return html`
      <mk-heading
        class="header"
        .level=${3}
        .path=${this.path && this.path.extend('heading')}
        .text=${_.get('heading', this.project)}
        .ready=${this.ready}>
      </mk-heading>
      <div class="image-container">
        <mk-image
          .presize=${true}
          .fit=${'scale-down'}
          .maxWidth=${600}
          .maxHeight=${400}
          .path=${this.path && this.path.extend('image')}
          .noGet=${true}
          .image=${_.get('image', this.project)}
          .ready=${this.ready}>
        </mk-image>
      </div>
      <div class="bottom">
        <a href="${_.get('url', this.project)}" target="_blank">Visit website <mwc-icon>launch</mwc-icon></a>
        <br>
        <a href="#" target="_blank">View code <mwc-icon>launch</mwc-icon></a>   
      </div>
    `;
  }
});
