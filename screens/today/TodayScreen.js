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
  function onCompletionChange(index, checked) {
    todoItems[index].checked = checked;
    db
        .collection('users')
        .doc(userId)
        .update("todos",todoItems);
  }


  return (
    <View style={{ height: '100%' }}>
      <ToDoList todoItems={todoItems}
                onCompletionChange={onCompletionChange}
                onSelected={(index, title, date, checked) => navigation.navigate('AddItem',{from:"Today",title:title,date:date,updateIndex:index,checked:checked})}
      />

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
