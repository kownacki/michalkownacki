import fb from '../../utils/firebase.js'
import loggedInMixin from '../../utils/loggedInMixin.js'
import MkwcImage from 'mkwc/edit/mkwc-image.js';

customElements.define('mk-image', class extends loggedInMixin('enableEditing', MkwcImage) {
  getData(path) {
    return fb.get(path);
  }
  updateData(path, file, oldImage) {
    return fb.updateImage(path, file, (_.get('name', oldImage)));
  }
});
