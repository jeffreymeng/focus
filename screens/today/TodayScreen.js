import React from 'react';
import ToDoList from '../../components/ToDoList';
import { db, auth } from '../../firebase';

export default function TodayScreen() {
  const [todoItems, setTodoItems] = React.useState([]);
  const userId = auth.currentUser.uid;

  React.useEffect(() => {
    db.collection('users')
      .doc(userId)
      .get()
      .then(doc => {
        if (doc.exists) {
          setTodoItems(doc.data().todos);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return <ToDoList todoItems={todoItems} />;
}
TodayScreen.navigationOptions = {
  title: 'Today',
};
