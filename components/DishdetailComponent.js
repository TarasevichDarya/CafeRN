import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, Text, ScrollView, StyleSheet, Modal, Button, Alert, PanResponder } from 'react-native';
import { Card, Input, Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

function RenderDish(props) {
    const dish = props.dish;

    const recognizedDrag = ({moveX, moveY, dx, dy}) => {
        if(dx < -200)
            return true;
        else
            return false;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end ", gestureState);
            if(recognizedDrag(gestureState))
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
            return true;
        }
    });

    if(dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers}>
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
                            style={ props.favorite ? { fontSize: 20, color: '#f50', justifyContent: 'center' } : { fontSize: 20, backgroundColor: 'white', justifyContent: 'center' }} 
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onLikePress()} 
                        />
                        <Icon 
                            raised 
                            reverse 
                            name='pencil'
                            style={{ fontSize: 20, padding:10, justifyContent: 'center' }} 
                            onPress={() => props.onEditPress()} 
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    } else {
        return(<SafeAreaView />);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>
                    {item.comment}
                </Text>
                <View style={[styles.row, {justifyContent: 'flex-start'}]}>
                    <Rating 
                        imageSize={12} 
                        ratingCount={5}
                        startingValue={item.rating}
                        minValue={0}
                        fractions={0}
                        readonly
                    />
                </View>
                <Text style={{fontSize: 12}}>
                    {'-- ' + item.author + ', ' + item.date}
                </Text>
            </View>
        );
    }

    return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card 
                title="Comments"
                dividerStyle={{ backgroundColor: 'gray', height: 0.7 }}
                >
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()} 
                    />
            </Card>
        </Animatable.View>
    );
}

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

        //+ meant if dishId=string, + turn string into number
        return(
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onLikePress={() => this.markFavorite(dishId)}
                    onEditPress={() => this.toggleModal()}
                /> 
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal 
                    animationType={'slide'} 
                    transparent={false} 
                    visible={this.state.showModal} 
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            style={{paddingVertical: 10}}
                            ratingCount={5}
                            startingValue={this.state.rating}
                            minValue={0}
                            fractions={0}
                            onStartRating={() => console.log('Started')}
                            onFinishRating={(rating) => {console.log(rating); this.setState({rating})}}
                            />
                        <Input 
                            placeholder={'Author'}
                            value={this.state.author}
                            onChangeText={(value) => this.setState({ author: value })} 
                        />
                        <Input 
                            placeholder={'Comment'} 
                            value={this.state.dishComment}
                            onChangeText={(value) => this.setState({ dishComment: value })}
                        />
                        <Button onPress={() => { this.handleComment(); this.toggleModal(); this.resetForm()}} color='#512DA8' title='Submit' ></Button>
                        <View style={{ backgroundColor: 'transparent', width: '100%', height: 20 }}/>
                        <Button onPress={() => { this.resetForm()}} color='gray' title='Cancel' ></Button>
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

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
      },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'gold',
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
