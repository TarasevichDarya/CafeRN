import { Share } from 'react-native';

const socialShare = (title, message, url) => {
  Share.share({
    title: title,
    message: title + ': ' + message + ' ' + url,
    url: url
  },{
    dialogTitle: 'Share ' + title
  })
}

export default socialShare;
