import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../styles/shared-styles.js';
import fb from '../../utils/firebase.js';
import './mk-projects/mk-projects-items.js';

export default class MkProjects extends LitElement {
  static get properties() {
    return {
      path: fb.Path,
      section: Object,
      ready: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
      }
    `];
  }
  render() {
    return html`
      <mk-projects-items
        .path=${this.path && this.path.extend('items')}
        .projects=${_.get('items', this.section)}
        .ready=${this.ready}>
      </mk-projects-items>
    `;
  }
}
customElements.define('mk-projects', MkProjects);
