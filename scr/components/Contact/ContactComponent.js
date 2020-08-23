import React, { Component } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { streetPartOne, streetPartTwo, cityofCafe, telOfCafe, faxOfCafe, emailOfCafe } from '../../constants/baseConstants';
import styles from './styles';
import sendEmail from '../../utils/sendEmail';

class Contact extends Component {

  static navigationOptions = {
    title: 'Contact Us'
  }
  
  render() {
    return(
      <SafeAreaView>
        <Animatable.View 
          animation="fadeInDown" 
          duration={2000} 
          delay={1000} 
          useNativeDriver={true}
        >
          <Card
            featuredTitle={'con1'}
            featuredSubtitle={'con2'}
          >
            <Text style={styles.titleText}>
              Contact Information
            </Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.contactText}>
              {streetPartOne}
            </Text>
            <Text style={styles.contactText}>
              {streetPartTwo}
            </Text>
            <Text style={styles.contactText}>
              {cityofCafe}
            </Text>
            <Text style={styles.contactText}>
              {telOfCafe}
            </Text>
            <Text style={styles.contactText}>
              {faxOfCafe}
            </Text>
            <Text style={styles.contactText}>
              {emailOfCafe}
            </Text>
            <Button
              title="Send Email"
              buttonStyle={styles.btnStyle}
              icon={
                <Icon 
                  name='envelope-o' 
                  type='font-awesome' 
                  color='white' 
                  style={styles.iconStyle} 
                />
              }
              onPress={sendEmail}
            />
          </Card>
        </Animatable.View>
      </SafeAreaView>
    );
  }
}

export default Contact;
