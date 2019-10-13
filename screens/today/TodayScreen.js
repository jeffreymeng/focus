import React from 'react';
import ToDoList from '../../components/ToDoList';
import { db } from '../../firebase';

export default function TodayScreen() {
  const [todoItems, setTodoItems] = React.useState([]);

  React.useEffect(() => {
    db.collection('users')
      .doc('john')
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log(JSON.stringify(doc.data().todos));
          setTodoItems(doc.data().todos);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [setTodoItems]);

  return <ToDoList todoItems={todoItems} />;
}
TodayScreen.navigationOptions = {
  title: 'Today',
};
