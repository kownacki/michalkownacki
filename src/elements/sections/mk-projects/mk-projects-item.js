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
      .header {
        text-align: center;
        margin: 20px 0;
        padding: 0 20px;
      }
      .image-container {
        position: relative;
        border: var(--border);
        padding-bottom: calc(2/3 * (100% - 2px));
        align-items: center;
      }
      mk-image {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
      .links-container {
        display: flex;
        position: absolute;
        top: 50%;
        left: 0;
        bottom: 0;
        right: 0;
        justify-content: center;
        align-items: center;
        background: transparent;
        transition: background-color 0.5s ease;
      }
      .image-container:hover .links-container {
        background-color: rgba(var(--primary-color-rgb), 0.75);
      }
      .image-container:hover .links {
        display: block;
      }
      .links {
        display: none;
        text-align: center;
      }
      a {
        text-decoration: none;
        color: white;
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
        <div class="links-container">
          <div class="links bigger-text">
            <a href="${_.get('links.url', this.project)}" target="_blank">Visit website <mwc-icon>launch</mwc-icon></a>
            ${!_.get('links.code', this.project) ? '' : html`
              <br>
              <a href="${_.get('links.code', this.project)}" target="_blank">View code <mwc-icon>launch</mwc-icon></a>   
            `}
          </div>
        </div>
      </div>
    `;
  }
});
