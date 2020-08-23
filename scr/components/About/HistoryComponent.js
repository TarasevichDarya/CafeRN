import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ourHistoryPartOne, ourHistoryPartTwo } from '../../constants/baseConstants';
import styles from './styles';

const History = () => {
  return(
    <SafeAreaView>
      <Card
        featuredTitle={'abt1'}
        featuredSubtitle={'abt2'}
      >
        <Text style={styles.titleText}>
          Our History
        </Text>
        <View style={styles.horizontalLine} />
        <Text style={styles.historyText}>
          {ourHistoryPartOne}
        </Text>
        <Text style={styles.historyText}>
          {ourHistoryPartTwo}
        </Text>
      </Card>
    </SafeAreaView> 
  );
};

export default History;
