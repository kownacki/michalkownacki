import {LitElement, html, css} from 'lit';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import 'mkwc/fixes/mwc-textarea-fixed.js';
import {scrollOffset} from '../../../../config.js';
import {sleep, isMailValid, mapValuesAndKeys} from 'mk-js-utils';
import sharedStyles from "../../../styles/shared-styles.js";

const FIELDS = ['name', 'email', 'text'];

//todo Autocomplete not working. See https://github.com/material-components/material-components-web-components/issues/82
customElements.define('mk-contact-form', class extends LitElement {
  static get properties() {
    return {
      // observables
      checkValidity: {type: Boolean, reflect: true},
      sent: {type: Boolean, reflect: true},
      loading: {type: Boolean, reflect: true},
      error: {type: Boolean, reflect: true},
    };
  }
  updated(changedProperties) {
    if (changedProperties.has('loading') && this.loading) {
      import('@polymer/paper-spinner/paper-spinner-lite.js');
    }
  }
  async _sendMessage() {
    const inputs = mapValuesAndKeys(_, (id) => [this.shadowRoot.getElementById(id), id], FIELDS);
    this.checkValidity = true;
    // allow checkValidity to propagate
    await sleep();
    const firstInvalidRequiredInput = _.find((input) => !input.checkValidity(), inputs);
    if (firstInvalidRequiredInput) {
      firstInvalidRequiredInput.focus();
      firstInvalidRequiredInput.reportValidity();
      firstInvalidRequiredInput.scrollIntoView();
      window.scrollBy(0, -scrollOffset);
    } else {
      await import('@polymer/iron-ajax/iron-ajax.js');
      this.shadowRoot.getElementById('ajax').body = _.mapValues(_.get('value'), inputs);
      this.shadowRoot.getElementById('ajax').generateRequest();
    }
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        --width: 750px;
        width: var(--width);
        max-width: calc(100% - 40px);
        font-size: 18px;
        display: block;
        padding: 0 20px;
        margin: 20px auto;
      }
      .inputs > .top {
        display: flex;
        margin: 0 -12px;
      }
      .inputs > .top > * {
        flex: 1;
        margin: 0 12px 5px;
      }
      .inputs > .bottom {
        margin-bottom: 20px;
      }
      mwc-textarea-fixed {
        display: block;
        height: 250px;
        --mdc-textarea-fixed-divider-color: var(--divider-color);
      }
      mwc-icon-button {
        color: var(--primary-color);
        display: block;
        width: 48px;
        height: 50px;
        --mdc-icon-size: 36px;
        margin-left: auto;
        margin-right: 10px;
      }
      paper-spinner-lite {
        display: block;
        padding: 11px;
        margin-left: auto;
        margin-right: 10px;
        --paper-spinner-color: var(--primary-color);
      }
      :host(:not([loading])) paper-spinner-lite {
        display: none;
      }
      :host([loading]) mwc-icon-button, :host([sent]) mwc-icon-button {
        display: none;
      }
      .confirmation {
        text-align: center;
        padding: 13.5px 20px;
      }
      :host(:not([sent])) .confirmation {
        display: none;
      }
      :host([error]) .sent {
        display: none;
      }
      :host(:not([error])) .error {
        display: none;
      }
      @media all and (max-width: 719px) {
        .inputs > .top {
          flex-direction: column;
        }
      }
    `];
  }
  render() {
    return html`
      <div class="inputs">
        <div class="top">
          ${_.map((input) => html`
            <mwc-textfield
              id="${input.id}"
              .disabled=${this.loading || this.sent}
              .maxlength=${1000}
              .required=${this.checkValidity}
              .validityTransform=${(input.id === 'email' && this.checkValidity) 
                ? (value) => ({valid: isMailValid(value)}) 
                : null
              }
              .validationMessage=${input.id === 'email' ? 'Valid email required' : 'Required field'}
              .label=${input.label}
              @input=${(event) => event.target.checkValidity() && event.target.reportValidity()}>
            </mwc-textfield>
          `, [
            {id: 'name', label: 'Your name'},
            {id: 'email', label: 'Your email'},
          ])}
        </div>
        <div class="bottom">
          <mwc-textarea-fixed
            id="text"
            .disabled=${this.loading || this.sent}
            .required=${this.checkValidity}
            .validationMessage=${'Required field'}
            .label=${'Your message to me'}
            @input=${(event) => event.target.checkValidity() && event.target.reportValidity()}>
          </mwc-textarea-fixed>    
        </div>
      </div>
      <mwc-icon-button
        .icon=${'send'}
        @click=${this._sendMessage}>
      </mwc-icon-button>
      <paper-spinner-lite active></paper-spinner-lite>
      <div class="confirmation">
        <span class="sent">Message sent. Thank you for contacting me.</span>
        <span class="error">Something went wrong while sending message. Please use contact data below.</span>
      </div>
      <iron-ajax
        id="ajax"
        url="https://europe-west1-pl-michalkownacki.cloudfunctions.net/sendMessage"
        content-type="application/json"
        method="POST"
        @loading-changed=${async (event) => {
          this.loading = event.detail.value;
          if (!this.loading) {
            this.sent = true;
          }
        }}
        @last-error-changed=${(event) => this.error = Boolean(event.detail.value)}>
      </iron-ajax>
    `;
  }
});
