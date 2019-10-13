import React from 'react';
import ToDoItemCheckbox from "./ToDoItemCheckbox";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

export default function ToDoListItem({ id, title, subtitle, selected, onSelect }) {
  const [checked, setChecked] = React.useState(false);

  return (
      <TouchableOpacity
          onPress={() => onSelect(id)}
          style={[
            styles.item,
            { backgroundColor: selected ? '#C0C0C0' : '#F0F0F0' },
          ]}
      >
        <View style={{flexDirection:'row'}}>
          <View
              style={{flex:1}}>
            <ToDoItemCheckbox
            checked={checked}
            onPress = { () => setChecked(!checked)}
            ></ToDoItemCheckbox>
          </View>
          <View
              style={{flex:3}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius:8,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 12,
  },

});