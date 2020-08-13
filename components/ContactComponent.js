import React, { Component } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { Card } from 'react-native-elements';

const streetPartOne = '121, Clear Water Bay Road';
const streetPartTwo = 'Clear Water Bay, Kowloon';
const cityofCafe = 'HONG KONG';
const telOfCafe = 'Tel: +852 1234 5678';
const faxOfCafe = 'Fax: +852 8765 4321';
const emailOfCafe = 'Email:confusion@food.net';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    render() {
        return(
            <SafeAreaView>
                <Card
                    featuredTitle={'con1'}
                    featuredSubtitle={'con2'}
                    >
                    <Text style={{textAlign: "center", fontSize: 18, fontWeight: "bold"}}>
                        Contact Information
                    </Text>
                    <View style={{backgroundColor: 'gray', height: 1, alignSelf: 'stretch', margin: 5}} />
                    <Text style={{margin: 10, fontSize: 14, fontWeight: "bold"}}>
                        {streetPartOne}
                    </Text>
                    <Text style={{margin: 10, fontSize: 14, fontWeight: "bold"}}>
                        {streetPartTwo}
                    </Text>
                    <Text style={{margin: 10, fontSize: 14, fontWeight: "bold"}}>
                        {cityofCafe}
                    </Text>
                    <Text style={{margin: 10, fontSize: 14, fontWeight: "bold"}}>
                        {telOfCafe}
                    </Text>
                    <Text style={{margin: 10, fontSize: 14, fontWeight: "bold"}}>
                        {faxOfCafe}
                    </Text>
                    <Text style={{margin: 10, fontSize: 14, fontWeight: "bold"}}>
                        {emailOfCafe}
                    </Text>
                </Card>
            </SafeAreaView>
        );
    }
}

export default Contact;