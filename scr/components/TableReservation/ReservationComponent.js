import React, { Component } from 'react';
import { Text, View, ScrollView, Picker, Switch , Button, TouchableOpacity, Modal, Alert } from 'react-native';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Animatable from 'react-native-animatable';
import PushNotification from 'react-native-push-notification';
import RNCalendarEvents from "react-native-calendar-events";
import styles from './styles';
import { convertDateToISO, convertMomentToDate, convertMomentToDateAndPlusTwoHours } from '../../utils/convertDate';

PushNotification.configure({
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },
  popInitialNotification: true,
  requestPermissions: true
});

const localNotification = (date) => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: 'Reservation for '+ date + ' requested',
    subText: 'Your Reservation',
    title: 'Your Reservation',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    //actions: '["Yes", "No"]'
  })
};

const createEvent = (eventTitle, eventStartDate, eventEndDate, eventLocation, eventDescrition) => {
  RNCalendarEvents.requestPermissions((readOnly = false));

  RNCalendarEvents.saveEvent(eventTitle, {
    startDate: convertDateToISO(eventStartDate),
    endDate: convertDateToISO(eventEndDate),
    location: eventLocation,
    description: eventDescrition
  });

}; 

class Reservation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      guests: 1,
      smoking: false,
      date: moment().format('YYYY-MM-DD h:mm a'),
      dateObject: moment(),
      showModal: false
    }
  }

  static navigationOptions = {
    title: 'Reserve Table'
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    Alert.alert(
      'Your Reservation OK?',
      `Number of Guests: ${this.state.guests} \nSmoking? ${this.state.smoking ? 'Yes' : 'No'} \nDate and Time: ${this.state.date}`,
      [
        {
          text: 'Cancel', onPress: () => {console.log('Not Reserved'); this.resetForm();}, style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
            console.log('Table was reserved'); 
            localNotification(this.state.date); 
            createEvent(
              'Con Fusion Table Reservation', 
              convertMomentToDate(this.state.dateObject), 
              convertMomentToDateAndPlusTwoHours(this.state.dateObject), 
              '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
              `You have a table reservation in Con Fusion cafe! \nNumber of guests: ${this.state.guests}, smoking? ${this.state.smoking ? 'Yes' : 'No'}.`
            ); 
            this.resetForm();
          }
        }
      ],
      { cancelable: false }
    )
    //this.toggleModal();
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: moment().format('YYYY-MM-DD h:mm a'),
      dateObject: moment()
    });
  }

  renderDatePicker() {
    return(
      <DateTimePickerModal
        mode={'datetime'}
        isVisible={this.state.isModalVisible}
        onDateChange={(value) => this.setState({ date: value })}
        onConfirm={(value) => this.setState({ isModalVisible: false, date: moment(value).format('YYYY-MM-DD h:mm a'), dateObject: moment(value) })}
        onCancel={() => this.setState({ isModalVisible: false })}
      />
    )
  }

  render() {
    return(
      <ScrollView>
        <Animatable.View 
          animation="zoomIn" 
          duration={2000} 
          delay={1000} 
          useNativeDriver={true}
        >
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>
              Number of Guests
            </Text>
            <Picker 
              style={styles.formItem} 
              selectedValue={this.state.guests} 
              onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue})}
            >
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
              <Picker.Item label='6' value='6' />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>
              Smoking/Non-Smoking?
            </Text>
            <Switch 
              style={styles.formItem} 
              value={this.state.smoking} 
              onTintColor='#512DA8' 
              onValueChange={(value) => this.setState({smoking: value})} 
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>
              Date and Time
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.border}
              onPress={() => this.setState({ isModalVisible: true })}
            >
              <Text 
                style={styles.textLabel}>
                {`${this.state.date}`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formRow}>
            <Button 
              title='Reserve' 
              color='#512DA8' 
              onPress={() => this.handleReservation()} 
              accessibilityLabel='Learn more about this purple button' 
            />
          </View>
          {this.renderDatePicker()}
          {/* <Modal 
            animationType={'slide'} 
            transparent={false} 
            visible={this.state.showModal} 
            onDismiss={() => {this.toggleModal(); this.resetForm()}}
            onRequestClose={() => {this.toggleModal(); this.resetForm()}}
            >
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Your Reservation</Text>
              <Text style={styles.modalText}>Number of Guests: { this.state.guests } </Text>
              <Text style={styles.modalText}>Smoking? : { this.state.smoking ? 'Yes' : 'No' } </Text>
              <Text style={styles.modalText}>Date and Time: { this.state.date } </Text>
              <Button onPress={() => { this.toggleModal(); this.resetForm()}} color='#512DA8' title='Close' ></Button>
            </View>
          </Modal> */}
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Reservation;
