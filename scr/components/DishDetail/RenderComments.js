import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({item, index}) => {
    return(
      <View key={index} style={styles.commentView}>
        <Text style={styles.commentText}>
          {item.comment}
        </Text>
        <View style={styles.commentViewStyle}>
          <Rating 
            imageSize={12} 
            ratingCount={5}
            startingValue={item.rating}
            minValue={0}
            fractions={0}
            readonly
          />
        </View>
        <Text style={styles.commentAuthor}>
          {'-- ' + item.author + ', ' + item.date}
        </Text>
      </View>
    );
  }

  return(
    <Animatable.View 
      animation="fadeInDown" 
      duration={2000} 
      delay={1000} 
      useNativeDriver={true}
    >
      <Card 
        title="Comments"
        dividerStyle={styles.cardStyle}
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

export default connect()(RenderComments);
