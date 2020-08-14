import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch , Button, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

class Reservation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      guests: 1,
      smoking: false,
      date: moment().format('YYYY-MM-DD h:mm a')
    }
  }

  static navigationOptions = {
    title: 'Reserve Table'
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.setState({
      guests: 1,
      smoking: false,
      date: moment().format('YYYY-MM-DD h:mm a')
    });
  }

  renderDatePicker() {
    return(
      <DateTimePickerModal
        mode={'datetime'}
        isVisible={this.state.isModalVisible}
        onDateChange={(value) => this.setState({ date: value })}
        onConfirm={(value) => this.setState({ isModalVisible: false, date: moment(value).format('YYYY-MM-DD h:mm a') })}
        onCancel={() => this.setState({ isModalVisible: false })}
      />
    )
  }

  render() {
    return(
      <ScrollView>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>
            Number of Guests
          </Text>
          <Picker style={styles.formItem} selectedValue={this.state.guests} onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue})}>
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
          <Switch style={styles.formItem} value={this.state.smoking} onTintColor='#512DA8' onValueChange={(value) => this.setState({smoking: value})} />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>
            Date and Time
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.border}
            onPress={() => this.setState({ isModalVisible: true })}>
            <Text 
              style={styles.textLabel}>
              {`${this.state.date}`}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formRow}>
          <Button title='Reserve' color='#512DA8' onPress={() => this.handleReservation()} accessibilityLabel='Learn more about this purple button' />
        </View>
        {this.renderDatePicker()}
      </ScrollView>
    );
  }
}

//react-native-datepicker - mode datetime works only for ios

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  textLabel: {
    fontSize: 18,
    flex: 2,
    textAlign: 'center',
    padding: 10
  },
  border: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black'
  },
  formItem: {
    flex: 1
  }
});

export default Reservation;
