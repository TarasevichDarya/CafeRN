import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import Icon from 'react-native-vector-icons/FontAwesome';

function RenderDish(props) {
    const dish = props.dish;

    if(dish != null) {
        return(
            <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
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
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: []
        };
    }

    markFavorite(dishId) {
        this.setState({ favorites: this.state.favorites.concat(dishId) })
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
                    dish={this.state.dishes[+dishId]} 
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    /> 
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default Dishdetail;