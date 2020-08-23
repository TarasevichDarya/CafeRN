import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 2
  },
  containerLogin: {
    justifyContent: 'center',
    margin: 10
  },
  formInput: {
    margin: 2
  },
  formLoginInput: {
    margin: 5
  },
  formCheckbox: {
    margin: 2,
    backgroundColor: null
  },
  formButton: {
    margin: 2
  },
  imageContainer: {
    width: 100,
    height: 100,
    margin: 2
  },
  image: {
    margin: 10,
    width: 80,
    height: 80,
    borderRadius: 40
  },
  cameraIcon: {
    borderRadius: 20, 
    width: 40, 
    height: 40, 
    backgroundColor: '#512DA8', 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    right: 5
  }
});

export default styles;
