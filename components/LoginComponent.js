import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false
    }
  }

  static navigationOptions = {
    title: 'Login'
  };

  handleLogin() {
    console.log(JSON.stringify(this.state));
  }

  render() {
    return(
      <View style={styles.container}>
        <Input 
          placeholder='Username'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          containerStyle={styles.formInput}
        />
        <Input 
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title='Remember Me'
          center
          checked={this.state.remember}
          onPress={() => this.setState({remember: !this.state.remember})} 
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button 
          onPress={() => this.handleLogin()}
          title='Login'
          color='#512DA8'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 10
  },
  formInput: {
    margin: 10
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null
  },
  formButton: {
    margin: 10
  }
});

export default Login;
