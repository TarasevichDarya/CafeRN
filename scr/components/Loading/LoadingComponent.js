import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import styles from './styles';

export const Loading = () => {
  return(
    <View style={styles.loadingView}>
      <ActivityIndicator 
        size='large' 
        color='#512DA8' 
      />
      <Text style={styles.loadingText}>
        Loading ...
      </Text>
    </View>
  );
}
