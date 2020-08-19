import React, { Component } from 'react';
import { View, Platform, SafeAreaView, Image, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
      navigationOptions: ({ navigation }) => ({
        headerLeft: 
        <TouchableOpacity 
          activeOpacity={0.8}
          style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}
          onPress={() => navigation.toggleDrawer()}>
          <Icon name='bars' size={24} color='white' />
        </TouchableOpacity>
      }) 
    },
    Dishdetail: { screen: Dishdetail}
}, {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: 
      <TouchableOpacity 
        activeOpacity={0.8}
        style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}
        onPress={() => navigation.toggleDrawer()}>
        <Icon name='bars' size={24} color='white' />
      </TouchableOpacity>
    })
});

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: 
    <TouchableOpacity 
      activeOpacity={0.8}
      style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}
      onPress={() => navigation.toggleDrawer()}>
      <Icon name='bars' size={24} color='white' />
    </TouchableOpacity>
  })
});

const AboutNavigator = createStackNavigator({
  About: { screen: About }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: 
    <TouchableOpacity 
      activeOpacity={0.8}
      style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}
      onPress={() => navigation.toggleDrawer()}>
      <Icon name='bars' size={24} color='white' />
    </TouchableOpacity>
  })
});

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: 
    <TouchableOpacity 
      activeOpacity={0.8}
      style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}
      onPress={() => navigation.toggleDrawer()}>
      <Icon name='bars' size={24} color='white' />
    </TouchableOpacity>
  })
});

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: 
    <TouchableOpacity 
      activeOpacity={0.8}
      style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}
      onPress={() => navigation.toggleDrawer()}>
      <Icon name='bars' size={24} color='white' />
    </TouchableOpacity>
  })
});

const LoginNavigator = createStackNavigator({
  Login: Login
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    title: 'Login',
    headerTintColor: "#fff",
    headerLeft: 
    <TouchableOpacity 
      activeOpacity={0.8}
      style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}
      onPress={() => navigation.toggleDrawer()}>
      <Icon name='bars' size={24} color='white' />
    </TouchableOpacity>
  })
});

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }} >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>
            Ristorante Con Fusion
          </Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Login: 
      { screen: LoginNavigator,
        navigationOptions: {
          title: 'Login',
          drawerLabel: 'Login',
          drawerIcon: ({ tintColor }) => (
          <Icon name='sign-in' size={24} color={tintColor} />
          )
        }
      },
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor }) => (
          <Icon name='home' size={24} color={tintColor} />
          )
        }
      },
    About: 
      { screen: AboutNavigator,
        navigationOptions: {
          title: 'About',
          drawerLabel: 'About Us',
          drawerIcon: ({ tintColor }) => (
            <Icon name='info-circle' size={24} color={tintColor} />
          )
        }, 
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor }) => (
            <Icon name='list' size={24} color={tintColor} />
          )
        }, 
      },
    Contact: 
      { screen: ContactNavigator,
        navigationOptions: {
          title: 'Contact Us',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor }) => (
            <Icon name='address-card' size={22} color={tintColor} />
          )
        }, 
      },
    Favorites: 
      { screen: FavoritesNavigator,
        navigationOptions: {
          title: 'My Favorites',
          drawerLabel: 'My Favorites',
          drawerIcon: ({ tintColor }) => (
            <Icon name='heart' size={24} color={tintColor} />
          )
        }, 
      },
    Reservation: 
      { screen: ReservationNavigator,
        navigationOptions: {
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
          drawerIcon: ({ tintColor }) => (
            <Icon name='cutlery' size={24} color={tintColor} />
          )
        }, 
      }
}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});

class Main extends Component {

    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchLeaders();
      this.props.fetchPromos();
      this.props.fetchComments();
    }
  
    render() {
        return(
            <SafeAreaView style={{ flex: 1 }}>
                <MainNavigator />
            </SafeAreaView>
        );
    }
}

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
  }
})

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
