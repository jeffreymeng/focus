import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import Bo from "../../components/BoldText";
import FeedItem from "./FeedItem";
import {Icon} from "native-base";

let It = (props) => <Text style={{fontStyle: "italic"}}>{props.children}</Text>;

export default function LinksScreen() {
  return (
    <View style={{display:"flex",height:"100%"}}>
      <View style={{
        paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d1d1d1",
      }}>
        <Text>
          <Bo>My Friends</Bo>{"\n"}
          <Bo>Richard Liu:</Bo> Hot Streak! &nbsp;<Icon name='flame' style={{fontSize: 24, color: "orange"}}/>{"\n"}
          <Bo>Jeffrey Meng:</Bo> Working on <It>Math Homework</It>{"\n"}
          <Bo>Nathan Wang:</Bo> Working on <It>Fixing Bugs</It>
        </Text>
      </View>
      <ScrollView style={styles.container}>
        <FeedItem>
          <Bo>Richard</Bo> is on a <Bo>Hot Streak</Bo>! &nbsp;<Icon name='flame'
                                                                    style={{fontSize: 24, color: "orange"}}/>
        </FeedItem>
        <FeedItem>
          <Bo>Richard</Bo> just completed <It>Washing Dishes</It>!
        </FeedItem>
        <FeedItem>
          <Bo>Richard</Bo> just completed <It>Calculus Chapter 4</It>!
        </FeedItem>
        <FeedItem>
          <Bo>Nathan</Bo> just completed <It>Chapter 5.1 Math Homework</It>!
        </FeedItem>
        <FeedItem>
          <Bo>Richard</Bo> just completed <It>Hackathon Project</It>!
        </FeedItem>
        <FeedItem>
          <Bo>Jeffrey</Bo> just completed <It>Spanish Lecture Notes</It>!
        </FeedItem>
        <FeedItem>
          <Bo>Richard</Bo> just completed <It>Hackathon Project</It>!
        </FeedItem>
      </ScrollView>
    </View>
  );
}

LinksScreen.navigationOptions = {
  title: "Feed",
};

const styles = StyleSheet.create({
  container: {
  },
});
