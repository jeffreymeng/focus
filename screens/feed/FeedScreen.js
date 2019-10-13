import React from 'react';
import { ScrollView, Button, StyleSheet, Text, View } from 'react-native';

import Bo from '../../components/BoldText';
import FeedItem from './FeedItem';
import { Icon } from 'native-base';

import { db } from '../../firebase';

let It = props => <Text style={{ fontStyle: 'italic' }}>{props.children}</Text>;

export default function LinksScreen() {
  const [feedData, setFeedData] = React.useState([]);
  React.useEffect(
    () =>
      db.collection('feed').onSnapshot(querySnapshot => {
        console.log('got update');
        let feeds = [];
        querySnapshot.forEach(doc => {
          feeds.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFeedData(feeds.sort((a, b) => b.time - a.time));
      }),
    []
  );

  return (
    <View style={{ display: 'flex', height: '100%' }}>
      {/*<View
        style={{
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          borderBottomWidth: 0.5,
          borderBottomColor: '#d1d1d1',
        }}
      >
        <Text>
          <Bo>My Friends</Bo>
          {'\n'}
          <Bo>Richard Liu:</Bo> Hot Streak! &nbsp;
          <Icon name="flame" style={{ fontSize: 24, color: 'orange' }} />
          {'\n'}
          <Bo>Jeffrey Meng:</Bo> Working on <It>Math Homework</It>
          {'\n'}
          <Bo>Nathan Wang:</Bo> Working on <It>Fixing Bugs</It>
        </Text>
      </View>*/}
      <ScrollView style={styles.container}>
        {feedData.map(feedItem => (
          <FeedItem key={feedItem.id}>
            <Bo>{feedItem.name}</Bo>{' '}
            {feedItem.hotStreak ? 'is on a' : 'just completed'}
            {feedItem.hotStreak ? (
              <>
                &nbsp; <Bo>Hot Streak</Bo>! &nbsp;
              </>
            ) : (
              <>
                &nbsp; <It>{feedItem.completed}</It>
              </>
            )}
            {feedItem.hotStreak && (
              <Icon name="flame" style={{ fontSize: 24, color: 'orange' }} />
            )}
          </FeedItem>
        ))}
      </ScrollView>
    </View>
  );
}

LinksScreen.navigationOptions = {
  title: 'Social Feed',
};

const styles = StyleSheet.create({
  container: {},
});
