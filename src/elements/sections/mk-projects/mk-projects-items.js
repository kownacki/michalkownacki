import {LitElement, html, css} from 'lit-element';
import './mk-projects-item.js';
import fb from '../../../utils/firebase.js';

customElements.define('mk-projects-items', class extends LitElement {
  static get properties() {
    return {
      path: fb.Path,
      projects: Object,
      ready: Boolean,
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        width: 1244px;
        max-width: calc(100% - 40px);
        margin: 0 auto;
        padding: 0 20px;
      }
      :host > * {
        margin: 10px;
        width: calc(50% - 20px);
      }
      @media all and (max-width: 839px) {
        :host {
          flex-direction: column;
        }
        :host > * {
          margin: 10px auto 30px;
          width: 602px;
          max-width: 100%;
        }
      }
    `;
  }
  render() {
    return html`
      ${_.map((index) => html`
        <mk-projects-item
          .path=${this.path && this.path.extend(`${index}`)}
          .project=${_.get(`${index}`, this.projects)}
          .ready=${this.ready}>
        </mk-projects-item>
      `, [0, 1])}
    `;
  }
});
