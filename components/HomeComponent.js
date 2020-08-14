import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

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

    static navigationOptions = {
        title: 'Home'
    }
    render() {
        return(
            <ScrollView>
                    <RenderItem
                        item={this.props.dishes.dishes}
                        isLoading={this.props.dishes.isLoading}
                        errMess={this.props.dishes.errMess}
                    />
                    <RenderItem
                        item={this.props.promotions.promotions}
                        isLoading={this.props.promotions.isLoading}
                        errMess={this.props.promotions.errMess}
                    />
                    <RenderItem
                        item={this.props.leaders.leaders}
                        isLoading={this.props.leaders.isLoading}
                        errMess={this.props.leaders.errMess}
                    />
                </ScrollView>
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
