import {mkFirebaseUtils} from 'mk-firebase-utils';

export default mkFirebaseUtils(_, firebase.firestore(), firebase.storage());
