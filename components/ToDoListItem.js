import React from 'react';
import ToDoItemCheckbox from "./ToDoItemCheckbox";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase";

export default function ToDoListItem({id, title, subtitle, selected, onSelect }) {
  const [checked, setChecked] = React.useState(false);

  function onCheckboxPress() {
    setChecked(!checked);

    const currentDoc = db.collection('users').doc(auth.currentUser.uid);
    currentDoc.update({
      "todos.0.checked":true
    });
  }
  return (
      <TouchableOpacity
          onPress={() => onSelect(id)}
          key={id}
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
            onPress = {onCheckboxPress}
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