import React from 'react';
import { Fab, Icon, View } from 'native-base';

import ToDoList from '../../components/ToDoList';
import { auth, db, FieldPath } from '../../firebase';

export default function TodayScreen({ navigation }) {
  const [todoItems, setTodoItems] = React.useState([]);
  const userId = auth.currentUser.uid;

  React.useEffect(
    () =>
      db
        .collection('users')
        .doc(userId)
        .onSnapshot(doc => {
          if (doc.exists && doc.data().todos) {
            setTodoItems(doc.data().todos.filter(x => new Date(x.date).getDate() === new Date().getDate()));
          }
        }),
    []
  );

  return (
    <View style={{ height: '100%' }}>
      <ToDoList todoItems={todoItems} />

      <Fab
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => navigation.navigate('AddItem',{from:"Today"})}
      >
        <Icon name="add" />
      </Fab>
    </View>
  );
}

TodayScreen.navigationOptions = {
  title: 'Today',
};
