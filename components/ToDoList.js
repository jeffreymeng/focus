import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import ToDoListItem from '../components/ToDoListItem';

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
            key={item.id}
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

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
