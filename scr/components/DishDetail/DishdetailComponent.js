import React, { Component } from 'react';
import { View, ScrollView, Modal, Button } from 'react-native';
import { Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { postFavorite, postComment } from '../../redux/ActionCreators';
import styles from './styles';
import RenderDish from './RenderDish';
import RenderComments from './RenderComments';

class Dishdetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      rating: 1,
      author: '',
      dishComment: '' 
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.markFavorite = this.markFavorite.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  static navigationOptions = {
    title: 'Dish Details'
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      showModal: false,
      rating: 1,
      author: '',
      dishComment: '' 
    });
  }

  handleComment() {
    const dishId = this.props.navigation.getParam('dishId','');
    const { rating, author, dishComment } = this.state;
    this.props.postComment(dishId, rating, author, dishComment);
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId','');
    const comments = this.props.comments.comments.filter((comment) => comment.dishId === dishId);

    //+ meant if dishId=string, + turn string into number
    return(
      <ScrollView>
        <RenderDish 
          dish={this.props.dishes.dishes[+dishId]} 
          favorite={this.props.favorites.some(el => el === dishId)}
          onLikePress={() => this.markFavorite(dishId)}
          onEditPress={() => this.toggleModal()}
        /> 
        <RenderComments 
          comments={comments} 
        />
        <Modal 
          animationType={'slide'} 
          transparent={false} 
          visible={this.state.showModal} 
        >
          <View style={styles.modal}>
            <Rating
              showRating
              style={styles.ratingStyle}
              ratingCount={5}
              startingValue={this.state.rating}
              minValue={0}
              fractions={0}
              onStartRating={() => console.log('Started')}
              onFinishRating={(rating) => {console.log(rating); this.setState({rating})}}
            />
            <Input 
              placeholder={'Author'}
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              value={this.state.author}
              onChangeText={(value) => this.setState({ author: value })} 
            />
            <Input 
              placeholder={'Comment'} 
              leftIcon={{ type: 'font-awesome', name: 'pencil' }}
              value={this.state.dishComment}
              onChangeText={(value) => this.setState({ dishComment: value })}
            />
            <Button 
              onPress={() => { this.handleComment(); this.toggleModal(); this.resetForm()}} 
              color='#512DA8' 
              title='Submit' 
            />
            <View style={styles.viewStyle}/>
            <Button 
              onPress={() => { this.resetForm()}} 
              color='gray' 
              title='Cancel' 
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, dishComment) => dispatch(postComment(dishId, rating, author, dishComment))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
