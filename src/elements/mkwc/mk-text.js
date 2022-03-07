import {MkwcText} from 'mkwc/edit/mkwc-text.js';
import {headerHeight, ckeditorBaloonHeight} from '../../../config.js';
import fb from '../../utils/firebase.js';
import loggedInMixin from '../../utils/loggedInMixin.js';

customElements.define('mk-text', class extends loggedInMixin('enableEditing', MkwcText) {
  constructor() {
    super();
    this.scrollOffset = headerHeight + ckeditorBaloonHeight;
  }
  getData(path) {
    return fb.get(path);
  }
  updateData(path, text) {
    return fb.update(path, text);
  }
});
