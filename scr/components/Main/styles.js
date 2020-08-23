import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  },
  touchableOpacityStyle: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 15 
  },
  logoStyle: { 
    flex: 1 
  },
  drawerHeaderView: { 
    flex: 2 
  }
})

export default styles;
