import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Platform,
} from 'react-native';
import ToDoListItem from '../components/ToDoListItem';
import Constants from 'expo-constants';
import Icon from './Icon';

export default function ToDoList({ todoItems }) {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(id => {
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));

    setSelected(newSelected);
  }, [selected]);

  function renderTime(time) {
    const t = new Date(time);
    t.setSeconds(0);

    return t.toLocaleTimeString().replace(':00 ', ' ');
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todoItems}
        renderItem={({ item }) => (
          <ToDoListItem
            id={item.id}
            title={item.title}
            subtitle={renderTime(item.date)}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
      <View>
        <TouchableHighlight
          style={styles.addButton}
          underlayColor="#809fff"
          onPress={() => alert('Yaay!')}
        >
          <Icon
            name={Platform.OS === 'ios' ? `ios-add` : 'md-add'}
            size={50}
            color={'white'}
          />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  addButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: '#809fff',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    position: 'absolute',
    bottom: 20,
  },
});
