import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import ToDoListItem from '../components/ToDoListItem';

export default function ToDoList({
  todoItems,
  onCompletionChange,
  onSelected,
}) {
  function renderTime(time) {
    const t = new Date(time);
    t.setSeconds(0);

    return t.toLocaleTimeString().replace(':00 ', ' ');
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todoItems}
        onRefresh={function(){}}
        refreshing={false}
        renderItem={({ item, index }) => (
          <ToDoListItem
            index={index}
            key={item.id}
            id={item.id}
            title={item.title}
            subtitle={renderTime(item.date)}
            onSelect={() =>
              onSelected(item.id, item.title, new Date(item.date), item.checked)
            }
            onCheckboxPress={onCompletionChange}
            checked={item.checked}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
