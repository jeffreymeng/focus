import React from 'react';
import {Fab, Icon, View} from 'native-base';

import ToDoList from '../../components/ToDoList';
import {auth, db} from '../../firebase';
import {Alert} from 'react-native';

export default function TomorrowScreen({navigation}) {
  const [todoItems, setTodoItems] = React.useState([]);
  const userId = auth.currentUser.uid;

  React.useEffect(
    () =>
      db
        .collection('users')
        .doc(userId)
        .collection('todos')
        .onSnapshot(querySnapshot => {
          let todos = [];
          querySnapshot.forEach(doc => {
            todos.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setTodoItems(
            todos.filter(
              x => new Date(x.date).getDate() === new Date().getDate() + 1
            )
          );
        }),
    []
  );

  function onCompletionChange(id) {
    let currentTodo = todoItems.filter(todo => todo.id === id)[0];

    Alert.alert(
      "Reschedule '" + currentTodo.title +  "'?",
      'Would you like to reschedule this task to today?',
      [
        {
          text: 'Cancel',
          onPress: () => {
          },
          style: 'cancel',
        },
        {
          text: 'Reschedule', onPress: () => {

            const now = new Date();
            currentTodo.date = now;
            console.log("RESCHEDULE");
            db
                .collection('users')
                .doc(userId)
                .collection('todos')
                .doc(id).update({
              date:now.toISOString()
            });
            navigation.navigate('Working', {
              from: 'Today',
              todo:currentTodo
            });
          }
        },
      ],
      {cancelable: false},
    );
  }

  function editTodo(id, title, date, checked) {
    navigation.navigate('EditItem', {
      from: 'Tomorrow',
      title,
      date,
      id,
      checked,
    });
  }

  return (
    <View style={{height: '100%'}}>
      <ToDoList
        todoItems={todoItems}
        onCompletionChange={onCompletionChange}
        onSelected={editTodo}
      />
      <Fab
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        onPress={() => navigation.navigate('AddItem', {from: 'Tomorrow'})}
      >
        <Icon name="add"/>
      </Fab>
    </View>
  );
}

TomorrowScreen.navigationOptions = {
  title: 'Tomorrow',
};
