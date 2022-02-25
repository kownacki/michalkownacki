import {LitElement, html, css} from 'lit-element';
import {staticElement} from 'mk-frontend-web-utils/lit';
import sharedStyles from "../styles/shared-styles";
import ckContent from '../styles/ck-content.js';
import './mkwc/mk-text.js';
import './mk-content-label.js';

export default class MkHeading extends LitElement {
  static get properties() {
    return {
      path: Object,
      text: String,
      ready: Boolean,
      rich: Boolean,
      level: Number,
    };
  }
  static get styles() {
    return [sharedStyles, ckContent, css`
      :host {
        display: block;
        position: relative;
      }
      :host(:hover) mk-content-label {
        text-align: center;
        width: 100%;
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
        .rich=${this.rich}
        .richConfig=${'heading'}
        .ready=${this.ready}>
        ${staticElement(this, 'heading', `h${this.level}`, {}, this.rich ? {class: 'ck-content'} : {})}
      </mk-text>
      <mk-content-label .name=${`Heading ${this.level}`}></mk-content-label>
    `;
  }
}
customElements.define('mk-heading', MkHeading);
