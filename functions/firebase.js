import _ from 'lodash/fp.js';
import firebaseUtils from 'mk-utils/firebase.js';
import admin from 'firebase-admin';

admin.initializeApp();
export default firebaseUtils(_, admin.firestore(), admin.storage());
