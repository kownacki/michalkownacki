import {firebaseUtils} from 'mk-firebase-utils';

export default firebaseUtils(_, firebase.firestore(), firebase.storage());
