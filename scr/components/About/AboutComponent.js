import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../../constants/baseUrl';
import { Loading } from '../Loading/LoadingComponent';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import History from './HistoryComponent';

class About extends Component {

  constructor(props) {
    super(props);

    this.renderLeaderFlatlist = this.renderLeaderFlatlist.bind(this);
    this.renderLeaderItem = this.renderLeaderItem.bind(this);
  }

  static navigationOptions = {
    title: 'About Us'
  }

  renderLeaderItem = ({item, index}) => {
    return(
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true} 
        leftAvatar={{source: { uri: baseUrl + item.image }}} 
      />
    );
  }

  renderLeaderFlatlist = (leaders) => {
    return(
      <FlatList 
        data={leaders}
        renderItem={this.renderLeaderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }

  render() {
    
    if(this.props.leaders.isLoading) {
      return(
        <ScrollView>
          <History />
          <Card>
            <Text style={styles.titleText}>
              Corporate Leadership
            </Text>
            <View style={styles.horizontalLine} />
            <Loading />
          </Card>
        </ScrollView>
      );
    } else if(this.props.leaders.errMess) {
      return(
        <ScrollView>
          <Animatable.View 
            animation="fadeInDown" 
            duration={2000} 
            delay={1000} 
            useNativeDriver={true}
          >
            <History />
            <Card>
              <Text style={styles.titleText}>
                Corporate Leadership
              </Text>
              <View style={styles.horizontalLine} />
              <Text>
                {this.props.leaders.errMess}
              </Text>
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    } else {
      return(
        <ScrollView>
          <Animatable.View 
            animation="fadeInDown" 
            duration={2000} 
            delay={1000} 
            useNativeDriver={true}
          >
            <History />
            <Card>
              <Text style={styles.titleText}>
                Corporate Leadership
              </Text>
              <View style={styles.horizontalLine} />
              {this.renderLeaderFlatlist(this.props.leaders.leaders)}
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
}

export default connect(mapStateToProps)(About);
