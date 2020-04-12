import _ from 'lodash/fp.js';
import moment from 'moment-timezone';
import fb from './firebase.js';
import sendMessage from 'mk-firebase-functions-utils/sendMessage.js';

export default async (req, res) => {
  const now = Date.now();
  const config = (await fb.get(fb.path('_config/admin', 'sendMessage')));
  const options = {
    mailOptions : {
      subject: config.mailOptions.subject,
      to: config.mailOptions.to,
      getHtml: (body) => `
        <p>Name: ${body.name}</p>
        <p>Email: ${body.email}</p>
        <p>Message:<br><br>${_.replace(/\n/g, '<br>')(body.text)}</p>
      `,
    },
    mailTransport: config.mailTransport,
    timestamp: now,
    // Rough limit, to prevent attacks
    maxMessageSize: 10000,
  };
  await sendMessage(req, res, options);
  await fb.update(fb.path(`sentMessages/${fb.generateUid(now)}`, null), {
    ..._.mapValues(_.replace(/\n/g, '\\n'), req.body),
    to: options.mailOptions.to,
    timestamp: now,
    time: moment(options.timestamp).tz('Poland').format('LLLL'),
  });
};
