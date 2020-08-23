import React, { Component } from 'react';
import { View, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import { Icon, Input, CheckBox } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../../constants/baseUrl';
import * as Animatable from 'react-native-animatable';
import ImageResizer from 'react-native-image-resizer';
import RNSInfo from 'react-native-sensitive-info';
import { optionsForPhoto, optionsForRNSInfo } from '../../constants/baseConstants';
import styles from './styles';

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

  componentDidMount() {
    RNSInfo.getItem('userinfo', optionsForRNSInfo).then((userdata) => {
      let userinfo = JSON.parse(userdata);
      if(userinfo) {
        this.setState({
          username: userinfo.username,
          password: userinfo.password,
          remember: true
        })
      }
    })
  }

  handleLogin() {
    console.log(JSON.stringify(this.state));

    if(this.state.remember) {
      RNSInfo.setItem('userinfo', JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),optionsForRNSInfo).catch((error) => console.log('Could not save user info', error));
    } else {
      RNSInfo.deleteItem('userinfo', optionsForRNSInfo).catch((error) => console.log('Could not delete user info', error));
    }
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

  getPhoto = () => {

    ImagePicker.showImagePicker(optionsForPhoto, (response) => {
      console.log('Response from showImagePicker ', response);
      if (response.error) {
        console.log(response.error);
      } else if (!response.didCancel) {
        console.log(response);
        this.processImage(response.uri);
      } else {
        console.log('User cancelled image picker');
      }
    })
  }

  processImage = (imageUrl) => {
    ImageResizer.createResizedImage(imageUrl, 400, 400, "PNG", 100).then((response) => {
      console.log(response);
      this.setState({ imageUrl: response.uri });  
    });
  };
  
  static navigationOptions = {
      title: 'Register',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='user-plus' type='font-awesome' size={24} iconStyle={{ color: tintColor }} />
      ) 
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));

    if(this.state.remember) {
      RNSInfo.setItem('userinfo', JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),optionsForRNSInfo).catch((error) => console.log('Could not save user info', error));
    } else {
      RNSInfo.deleteItem('userinfo', optionsForRNSInfo).catch((error) => console.log('Could not delete user info', error));
    }
  }

  render() {

    return(
      <Animatable.View animation="zoomIn" duration={2000} delay={1000} useNativeDriver={true}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image 
                source={{uri: this.state.imageUrl}} 
                loadingIndicatorSource={require('../../../assets/images/logo.png')}
                style={styles.image} 
              />
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={this.getPhoto}
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
              onChangeText={(firstname) => this.setState({firstname})}
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
