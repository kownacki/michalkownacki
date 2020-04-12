import * as functions from 'firebase-functions';

import sendMessageFn from './sendMessage.js';
export const sendMessage = functions.region('europe-west1').https.onRequest(sendMessageFn);
