import React from 'react';
import ToDoItemCheckbox from './ToDoItemCheckbox';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebase';

export default function ToDoListItem({
  id,
  index,
  title,
  subtitle,
  selected,
  onSelect,
  onCheckboxPress,
  initialChecked,
}) {
  const [checked, setChecked] = React.useState(initialChecked);

  function _onCheckboxPress() {
    setChecked(!checked);
    onCheckboxPress(id, !checked);
  }
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      key={id}
      style={checked ? [styles.item, styles.itemChecked] : styles.item}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <ToDoItemCheckbox checked={checked} onPress={_onCheckboxPress} />
        </View>
        <View style={{ flex: 3 }}>
          <Text
            style={checked ? [styles.title, styles.titleChecked] : styles.title}
          >
            {title}
          </Text>
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
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  itemChecked: {
    backgroundColor: '#C0C0C0',
  },
  title: {
    fontSize: 24,
  },
  titleChecked: {
    textDecorationLine: 'line-through',
  },
  subtitle: {
    fontSize: 12,
  },
});
