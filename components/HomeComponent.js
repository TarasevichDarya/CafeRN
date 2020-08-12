import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }
    
    render() {
        return(
            <SafeAreaView>
                <Text>
                    Home Component
                </Text>
            </SafeAreaView>
        );
    }
}

export default Home;