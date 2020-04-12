import {LitElement, html, css} from 'lit-element';
import sharedStyles from "../styles/shared-styles";
import './mkwc/mk-text.js';
import './mk-content-label.js';

export default class MkHeading extends LitElement {
  static get properties() {
    return {
      path: Object,
      text: String,
      ready: Boolean,
      level: Number,
    };
  }
  static get styles() {
    return [sharedStyles, css`
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
        .ready=${this.ready}>
        ${['', html`<h1></h1>`, html`<h2></h2>`, html`<h3></h3>`][this.level]}
        <h2></h2>
      </mk-text>
      <mk-content-label .name=${`Heading ${this.level}`}></mk-content-label>
    `;
  }
}
customElements.define('mk-heading', MkHeading);
