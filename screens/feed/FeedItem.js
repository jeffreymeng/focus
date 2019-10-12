import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BoldText from "../../components/BoldText";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d1d1d1",
  },
});

const FeedItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text>
        <BoldText>{data.person}</BoldText> earned&nbsp;
        <BoldText>{data.value}</BoldText> points by completing&nbsp;
        <Text style={{fontStyle: "italic"}}>{data.task}</Text>!
      </Text>
    </View>
  );
};

export default FeedItem;