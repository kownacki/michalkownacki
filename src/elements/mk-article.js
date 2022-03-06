import {LitElement, html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import sharedStyles from "../styles/shared-styles.js";
import ckContent from '../styles/ck-content.js';
import './mkwc/mk-text.js';
import './mk-content-label.js';

export default class MkArticle extends LitElement {
  static get properties() {
    return {
      path: Object,
      text: String,
      ready: Boolean,
      rich: Boolean,
      richConfig: Boolean,
      classes: Object,
    };
  }
  static get styles() {
    return [sharedStyles, ckContent, css`
      :host {
        position: relative;
        display: block;
        margin: 40px auto;
        max-width: 700px;
        padding: 0 20px;
      }
      :host(:hover) mk-content-label {
        left: 20px;
        display: block;
      }
    `];
  }
  render() {
    return html`
      <mk-text
        .path=${this.path}
        .noGet=${true}
        .text=${this.text}
        .ready=${this.ready}
        .rich=${this.rich}
        .richConfig=${this.richConfig}
        .multiline=${true}>
        <div id="text" class="ck-content ${this.classes ? classMap(this.classes) : ''}"></div>
      </mk-text>
      <mk-content-label .name=${'Text'}></mk-content-label>
    `;
  }
}
customElements.define('mk-article', MkArticle);
