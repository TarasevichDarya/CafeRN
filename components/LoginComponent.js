import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

class LoginTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false
    }
  }

  static navigationOptions = {
    title: 'Login',
    tabBarIcon: ({ tintColor }) => (
      <Icon name='sign-in' type='font-awesome' size={24} iconStyle={{color: tintColor}} />
    )
  };

  handleLogin() {
    console.log(JSON.stringify(this.state));
  }

  render() {
    return(
      <Animatable.View animation="zoomIn" duration={2000} delay={1000} useNativeDriver={true}>
        <View style={styles.containerLogin}>
          <Input 
            placeholder='Username'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            containerStyle={styles.formLoginInput}
          />
          <Input 
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            containerStyle={styles.formLoginInput}
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
              icon={
                <Icon name='sign-in' type='font-awesome' size={24} color='white' />
              }
            />
          </View>
          <View style={styles.formButton}>
            <Button 
              onPress={() => this.props.navigation.navigate('Register')}
              title='Register'
              clear
              icon={
                <Icon name='user-plus' type='font-awesome' size={24} color='blue' />
              }
              color='#512DA8'
            />
          </View>
        </View>
      </Animatable.View>
    );
  }
}

class RegisterTab extends Component {

  constructor(props) {
      super(props);

      this.state = {
          username: '',
          password: '',
          firstname: '',
          lastname: '',
          email: '',
          remember: false,
          imageUrl: baseUrl + 'images/logo.png'
      }
  }

  getImageFromCamera = () => {
    console.log('Image from camera');
  }
  
  static navigationOptions = {
      title: 'Register',
      tabBarIcon: ({ tintColor, focused }) => (
          <Icon name='user-plus' type='font-awesome' size={24} iconStyle={{ color: tintColor }} />
        ) 
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));
  }

  render() {

    return(
      <Animatable.View animation="zoomIn" duration={2000} delay={1000} useNativeDriver={true}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image 
                source={{uri: this.state.imageUrl}} 
                loadingIndicatorSource={require('./images/logo.png')}
                style={styles.image} 
              />
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={this.getImageFromCamera}
                activeOpacity={0.8}>
                  <Icon name='camera' type='font-awesome' size={20} color= 'white' />
              </TouchableOpacity>
            </View>
            <Input
              placeholder="Username"
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
              containerStyle={styles.formInput}
            />
            <Input
              placeholder="Password"
              leftIcon={{ type: 'font-awesome', name: 'key' }}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              containerStyle={styles.formInput}
            />
            <Input
              placeholder="First Name"
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={(lastname) => this.setState({firstname})}
              value={this.state.firstname}
              containerStyle={styles.formInput}
            />
            <Input
              placeholder="Last Name"
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={(lastname) => this.setState({lastname})}
              value={this.state.lastname}
              containerStyle={styles.formInput}
            />
            <Input
              placeholder="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              containerStyle={styles.formInput}
            />
            <CheckBox title="Remember Me"
              center
              checked={this.state.remember}
              onPress={() => this.setState({remember: !this.state.remember})}
              containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
              <Button
                onPress={() => this.handleRegister()}
                title="Register"
                icon={ <Icon name='user-plus' type='font-awesome' size={24} color= 'white' /> }
                color='#512DA8'
              />
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    );
  }
}

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
    height: 60
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

const Login = createBottomTabNavigator({
  Login: LoginTab,
  Register: RegisterTab
}, {
  tabBarOptions: {
    activeBackgroundColor: '#9575CD',
    inactiveBackgroundColor: '#D1C4E9',
    activeTintColor: '#ffffff',
    inactiveTintColor: 'gray'
  }
});

export default Login;
