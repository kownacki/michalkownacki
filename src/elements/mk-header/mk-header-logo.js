import {LitElement, html, css} from 'lit-element';

customElements.define('mk-header-logo', class extends LitElement {
  static get properties() {
    return {
      noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
      scrolledDown: {type: Boolean, reflect: true, attribute: 'scrolled-down'},
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
      }
      a {
        line-height: 1em;
        padding: 15px;
        font-size: 30px;
        display: block;
        color: white;
        text-decoration: none;
      }
    `;
  }
  render() {
    return html`
      <a href="/">Michał Kownacki</a>
    `;
  }
});
