import React from 'react';
import { View, SafeAreaView, Text, Alert, PanResponder } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../../constants/baseUrl';
import { postFavorite, postComment } from '../../redux/ActionCreators';
import styles from './styles';
import socialShare from '../../utils/socialShare';

function RenderDish(props) {
  const dish = props.dish;

  const gestureRightToLeft = ({moveX, moveY, dx, dy}) => {
    if(dx < -200)
      return true;
    else
      return false;
  };

  const gestureLeftToRight = ({moveX, moveY, dx, dy}) => {
    if( dx > 200)
      return true;
    else
      return false;
  };

  handleViewRef = ref => this.view = ref;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      this.view.rubberBand(1000)
        .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end ", gestureState);
      if(gestureRightToLeft(gestureState)) 
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add ' + dish.name + ' to favorite?',
          [
            {
              text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'
            },
            {
              text: 'OK', onPress: () => {props.favorite ? console.log('Already Favorite') : props.onLikePress()}
            }
          ],
          {cancelable: false}
        );

      if(gestureLeftToRight(gestureState)) 
        props.onEditPress();

      return true;
    }
  });

  if(dish != null) {
    return(
      <Animatable.View 
        animation="fadeInDown" 
        duration={2000} 
        delay={1000} 
        ref={this.handleViewRef} 
        {...panResponder.panHandlers} 
        useNativeDriver={true}
      >
        <Card
          featuredTitle={dish.name}
          image={{ uri: baseUrl + dish.image }}
        >
          <Text style={{margin: 10}}>
            {dish.description}
          </Text>
          <View style={styles.row}>
            <Icon 
                raised 
                reverse 
                name={ props.favorite ? 'heart' : 'heart' } 
                style={ props.favorite ? styles.redHeart : styles.whiteHeart} 
                onPress={() => props.favorite ? console.log('Already favorite') : props.onLikePress()} 
            />
            <Icon 
                raised 
                reverse 
                name='pencil'
                style={styles.commentIcon} 
                onPress={() => props.onEditPress()} 
            />
            <Icon
                raised
                reverse
                name='share'
                type='font-awesome'
                color='black'
                style={styles.shareIcon}
                onPress={() => socialShare(dish.name, dish.description, baseUrl + dish.image)} 
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
      return(<SafeAreaView />);
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

export default connect(mapStateToProps)(RenderDish);