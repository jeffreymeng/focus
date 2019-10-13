import React from 'react';
import { Fab, Icon, View } from 'native-base';

import ToDoList from '../../components/ToDoList';
import { auth, db } from '../../firebase';

export default function TodayScreen({ navigation }) {
  const [todoItems, setTodoItems] = React.useState([]);
  const userId = auth.currentUser.uid;

  React.useEffect(
    () =>
      db
        .collection('users')
        .doc(userId)
        .collection('todos')
        .onSnapshot(querySnapshot => {
          console.log('got update');
          let todos = [];
          querySnapshot.forEach(doc => {
            todos.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setTodoItems(
            todos.filter(
              x => new Date(x.date).getDate() === new Date().getDate()
            )
          );
        }),
    []
  );

  function onCompletionChange(id) {
    const currentTodo = todoItems.filter(todo => todo.id === id)[0];
    if (!currentTodo.checked)
      navigation.navigate('Working', {
        from: 'Today',
        todo: currentTodo,
      });
  }

  function editTodo(id, title, date, checked) {
    navigation.navigate('EditItem', {
      from: 'Today',
      title,
      date,
      id,
      checked,
    });
  }

  return (
    <View style={{ height: '100%' }}>
      <ToDoList
        todoItems={todoItems}
        onCompletionChange={onCompletionChange}
        onSelected={editTodo}
      />

      <Fab
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => navigation.navigate('AddItem', { from: 'Today' })}
      >
        <Icon name="add" />
      </Fab>
    </View>
  );
}

TodayScreen.navigationOptions = {
  title: 'Today',
};
