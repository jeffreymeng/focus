import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d1d1d1",
  },
});

const FeedItem = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text>
        {children}
      </Text>
    </View>
  );
};

export default FeedItem;