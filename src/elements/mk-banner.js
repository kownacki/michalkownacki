import {LitElement, html, css} from 'lit-element';
import '@material/mwc-button';

customElements.define('mk-banner', class extends LitElement {
  static get properties() {
    return {
      uid: String,
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--secondary-color);
      }
      .text {
        text-align: center;
        font-size: 40px;
        color: #eceff1;
        margin: 30px;
      }
      .accent {
        color: var(--primary-color);
      }
      mwc-button {
        
      }
    `;
  }
  render() {
    return html`
      <div class="text">I'm a <span class="accent">web developer</span><br>specializing in<br>JavaScript and Web Components</div>
      <mwc-button
        .label=${'More'}
        .raised=${true}>
      </mwc-button>
    `;
  }
});
