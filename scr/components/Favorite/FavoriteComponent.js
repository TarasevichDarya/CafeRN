import React, { Component } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Swipeout from 'react-native-swipeout';
import { baseUrl } from '../../constants/baseUrl';
import { Loading } from '../Loading/LoadingComponent';
import { deleteFavorite } from '../../redux/ActionCreators';

class Favorites extends Component {
  static navigationOptions = {
    title: 'My Favorites'
  }

  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: 'Delete',
          type: 'delete',
          onPress: () => {
            Alert.alert(
              'Delete Favorite?',
              'Are you sure you wish to delete the favorite dish ' + item.name + ' ?',
              [
                {
                  text: 'Cancel', onPress: () => console.log(item.name + 'Not Deleted'), style: 'cancel'
                },
                {
                  text: 'OK', onPress: () => this.props.deleteFavorite(item.id)
                }
              ],
              { cancelable: false }
            );
          }
        }
      ];

      return(
        <Swipeout 
          right={rightButton} 
          autoClose={true}
        >
          <Animatable.View 
            animation="fadeInRightBig" 
            duration={2000} 
            useNativeDriver={true}
          >
            <ListItem
              key={index}
              title={item.name}
              subtitle={item.description}
              hideChevron={true}
              onPress={() => navigate('Dishdetail', {dishId: item.id})}
              leftAvatar={{source: { uri: baseUrl + item.image}}}
            />
          </Animatable.View>
        </Swipeout>
      );
    }

    if(this.props.dishes.isLoading) {
      return(
        <Loading />
      );
    } else if(this.props.dishes.errMess) {
      return(
        <View>
          <Text>
            {this.props.dishes.errMess}
          </Text>
        </View>
      );
    } else {
      return(
        <FlatList 
          data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))} 
          renderItem={renderMenuItem} 
          keyExtractor={item => item.id.toString()} 
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
      dishes: state.dishes,
      favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
