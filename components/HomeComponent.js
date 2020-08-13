import React, { Component } from 'react';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const RenderItem = (props) => {
    const item = props.item?.filter((promo) => promo.featured)[0];
    const isLoading = props.isLoading;
    
        return (
            <View>
            {isLoading &&
                <View style={{ height: 50, width: '100%', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'}  />
                </View>
            }
            {item && !isLoading &&
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

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }
    render() {
        return(
            <ScrollView>
                    <RenderItem
                        isLoading={this.props.dishes.isLoading}
                        item={this.props.dishes.dishes}
                    />
                    <RenderItem
                        isLoading={this.props.promotions.isLoading}
                        item={this.props.promotions.promotions}
                    />
                    <RenderItem
                        isLoading={this.props.leaders.isLoading}
                        item={this.props.leaders.leaders}
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
