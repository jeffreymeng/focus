import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import FeedItem from "./FeedItem";

const FEED_DATA = [
  {
    id: "firebase_id_1",
    type: "task_completion",
    person: "Nathan",
    task: "math homework",
    value: 5,
  },
  {
    id: "firebase_id_2",
    type: "task_completion",
    person: "Jeffrey",
    task: "video gaming",
    value: 10,
  },
  {
    id: "firebase_id_3",
    type: "task_completion",
    person: "Howard Peng",
    task: "Osu",
    value: 15,
  },
];

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      {FEED_DATA.map(item => (
        <FeedItem data={item} key={item.id}/>
      ))}
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: "Feed",
};

const styles = StyleSheet.create({
  container: {
  },
});
