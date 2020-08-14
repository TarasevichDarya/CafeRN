import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

function RenderDish(props) {
    const dish = props.dish;

    if(dish != null) {
        return(
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}
                >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <Icon raised reverse name={ props.favorite ? 'heart' : 'heart' } style={ props.favorite ? { fontSize: 20, color: '#f50' } : { fontSize: 20, backgroundColor: 'white' }} onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
            </Card>
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
                <Text style={{fontSize: 12}}>
                    {item.rating} Stars
                </Text>
                <Text style={{fontSize: 12}}>
                    {'-- ' + item.author + ', ' + item.date}
                </Text>
            </View>
        );
    }

    return(
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
    );
}

class Dishdetail extends Component {

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');

        //+ meant if dishId=string, + turn string into number
        return(
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    /> 
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
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
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
