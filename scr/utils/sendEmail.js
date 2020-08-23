import { Linking } from 'react-native';
import { sendEmailTo } from '../constants/baseConstants';

function sendEmail() {
  let to = sendEmailTo;
  let url = `mailto:${to}`;

  const query = {
    subject: 'Subject',
    body: 'Body:',
  };

  if (query.length) {
    url += `?${query}`;
  }

  const canOpen = Linking.canOpenURL(url);
  if (!canOpen) {
    throw new Error('Provided URL can not be handled');
  }

  return Linking.openURL(url);
}

export default sendEmail;
