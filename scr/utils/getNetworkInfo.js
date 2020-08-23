import { ToastAndroid } from 'react-native';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const GetNetInfo = () => {
  const netInfo = useNetInfo();
  console.log("Network info (2 way): ", netInfo);
  
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    ToastAndroid.show('Initial Network Connectivity Type: ' + state.type + ', isConnected: ' + state.isConnected, ToastAndroid.LONG);

    handleConnectivityChange(state);
  });

  function handleConnectivityChange(connectionInfo) {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }

  unsubscribe();

  return(null);
};

export default GetNetInfo;
