import React, { Component } from 'react';
import { Text, View, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../../constants/baseUrl';
import { Loading } from '../Loading/LoadingComponent';
import { xpos1, xpos2, xpos3 } from '../../constants/baseConstants';
import styles from './styles';

const RenderItem = (props) => {
  const item = props.item?.filter((promo) => promo.featured)[0];

  if(props.isLoading) {
    return(
      <Loading />
    );
  } else if(props.errMess) {
    return(
      <View>
        <Text>
          {props.errMess}
        </Text>
      </View>
    );
  } else {
    return (
      <View>
      {item && 
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{uri: baseUrl + item.image}}
        >
          <Text style={{margin: 10}}>
            {item.description}
          </Text>
        </Card>
      }
      </View>
    );    
  }
}

class Home extends Component {
    
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  static navigationOptions = {
    title: 'Home'
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 8,
        duration: 8000,
        easing: Easing.linear
      }
    ).start(() => this.animate());
  }

  render() {
    const xposition1 = this.animatedValue.interpolate(xpos1);
    const xposition2 = this.animatedValue.interpolate(xpos2);
    const xposition3 = this.animatedValue.interpolate(xpos3);

    return(
      <View style={styles.homeView}>
        <Animated.View 
          style={styles.animatedView, {transform: [{ translateX: xposition1 }]} } 
          useNativeDriver={true}
        >
          <RenderItem
            item={this.props.dishes.dishes}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
          />
        </Animated.View>
        <Animated.View 
          style={ styles.animatedView, {transform: [{ translateX: xposition2 }] }} 
          useNativeDriver={true}
        >
          <RenderItem
            item={this.props.promotions.promotions}
            isLoading={this.props.promotions.isLoading}
            errMess={this.props.promotions.errMess}
          />
        </Animated.View>
        <Animated.View 
          style={styles.animatedView, {transform: [{ translateX: xposition3 }] }} 
          useNativeDriver={true}
        >
          <RenderItem
            item={this.props.leaders.leaders}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess}
          />
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

export default connect(mapStateToProps)(Home);
