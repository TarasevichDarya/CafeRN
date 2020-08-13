import React, { Component } from 'react';
import { Text, SafeAreaView, View, Image, ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const ourHistoryPartOne = 'Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.';
const ourHistoryPartTwo = 'The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the worlds best cuisines in a pan.';

const History = (props) => {
    const renderLeaderItem = ({item, index}) => {
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

    const renderLeaderFlatlist = () => {
        return(
            <FlatList 
                data={props.leaders}
                renderItem={renderLeaderItem}
                keyExtractor={item => item.id.toString()}
                />
        );
    }

    return(
        <SafeAreaView>
            <ScrollView style={{height: '100%', width: '100%'}}>
                <Card
                    featuredTitle={'abt1'}
                    featuredSubtitle={'abt2'}
                    >
                    <Text style={{textAlign: "center", fontSize: 18, fontWeight: "bold"}}>
                        Our History
                    </Text>
                    <View style={{backgroundColor: 'gray', height: 0.7, alignSelf: 'stretch', margin: 5}} />
                    <Text style={{margin: 10, fontSize: 14}}>
                        {ourHistoryPartOne}
                    </Text>
                    <Text style={{margin: 10, fontSize: 14}}>
                        {ourHistoryPartTwo}
                    </Text>
                </Card>
                <Card
                    featuredTitle={'abt3'}
                    featuredSubtitle={'abt4'}
                    
                    >
                    <Text style={{textAlign: "center", fontSize: 18, fontWeight: "bold"}}>
                        Corporate Leadership
                    </Text>
                    <View style={{backgroundColor: 'gray', height: 0.7, alignSelf: 'stretch', margin: 5}} />
                    {renderLeaderFlatlist()}
                </Card>
            </ScrollView>
        </SafeAreaView> 
    );
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        return(
            <History 
                leaders={this.props.leaders.leaders} />
        );
    }
}

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

export default connect(mapStateToProps)(About);
