import React from 'react';
import { Fab, Icon, View } from 'native-base';

import ToDoList from '../../components/ToDoList';
import { auth, db } from '../../firebase';

export default function TodayScreen({ navigation }) {
  const [todoItems, setTodoItems] = React.useState([]);
  const userId = auth.currentUser.uid;

  React.useEffect(() => {
    db.collection('users')
      .doc(userId)
      .onSnapshot(doc => {
        if (doc.exists) {
          setTodoItems(doc.data().todos);
        }
      });
  }, []);

  return (
    <View style={{ height: '100%' }}>
      <ToDoList todoItems={todoItems} />
      <Fab
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => navigation.navigate('AddItem')}
      >
        <Icon name="add" />
      </Fab>
    </View>
  );
}

TodayScreen.navigationOptions = {
  title: 'Today',
};
