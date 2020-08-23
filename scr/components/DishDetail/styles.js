import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  redHeart: { 
    fontSize: 20, 
    color: '#f50', 
    justifyContent: 'center' 
  },
  whiteHeart: { 
    fontSize: 20, 
    backgroundColor: 'white', 
    justifyContent: 'center' 
  },
  commentIcon: { 
    fontSize: 20, 
    padding: 10, 
    justifyContent: 'center' 
  },
  shareIcon: { 
    fontSize: 20, 
    justifyContent: 'center' 
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gold',
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewStyle: { 
    backgroundColor: 'transparent', 
    width: '100%', 
    height: 20 
  },
  cardStyle: { 
    backgroundColor: 'gray', 
    height: 0.7 
  },
  commentView: {
    margin: 10
  },
  commentText: {
    fontSize: 14
  },
  commentViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'flex-start'
  },
  commentAuthor: {
    fontSize: 12
  },
  ratingStyle: {
    paddingVertical: 10
  }
});

export default styles;
