import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Platform } from 'react-native';
import Icon from '../components/Icon';
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
        ListEmptyComponent={<View style={styles.emptyContainer}>
          <Icon size={100} name={ Platform.OS === 'ios' ? 'ios-star' : 'md-star'}></Icon>
        </View>}
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
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  }
});
