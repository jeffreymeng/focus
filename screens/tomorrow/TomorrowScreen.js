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

  function onCompletionChange(id, checked) {
    Alert.alert(
      "Reschedule Task?",
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
            console.log("RESCHEDULE");
            // TODO add resched code
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
