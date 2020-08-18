import React, { Component } from 'react';
import { Text, SafeAreaView, View, Linking } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

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

    sendEmail() {
        let to = 'd.tarasevich@softteco.com';
        let url = `mailto:${to}`;

        const query = {
            subject: 'Enquiry',
            body: 'To whom it may concern:',
        };

        if (query.length) {
            url += `?${query}`;
        }

        const canOpen = Linking.canOpenURL(url);

        if (!canOpen) {
            throw new Error('Provided URL can not be handled');
        }

        return Linking.openURL(url);
    }

    render() {
        return(
            <SafeAreaView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000} useNativeDriver={true}>
                    <Card
                        featuredTitle={'con1'}
                        featuredSubtitle={'con2'}
                        >
                        <Text style={{textAlign: "center", fontSize: 18, fontWeight: "bold"}}>
                            Contact Information
                        </Text>
                        <View style={{backgroundColor: 'gray', height: 0.7, alignSelf: 'stretch', margin: 5}} />
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
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: "#512DA8"}}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white' style={{margin: 10}} />}
                            onPress={this.sendEmail}
                        />
                    </Card>
                </Animatable.View>
            </SafeAreaView>
        );
    }
}

export default Contact;
