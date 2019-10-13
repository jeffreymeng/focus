import React from 'react';
import ToDoList from '../../components/ToDoList';
import { db } from '../../firebase';

const TEST_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Do Math Homework',
    subtitle: 'subtitle',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Do Chem Homework',
    subtitle: 'subtitle',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Feed the cat',
    subtitle: 'subtitle',
  },
];

export default function TodayScreen() {
  const [todoItems, setData] = React.useState([]);

  React.useEffect(() => {
    console.log('test');
    setTimeout(() => {
      setData(TEST_DATA);
    }, 100);
    return;

    db.collection('users')
      .doc('john')
      .get()
      .then(doc => {
        if (doc.exists) {
          setData(doc.todoItems().todo);
        }
      });
  });

  return <ToDoList todoItems={todoItems} />;
}
TodayScreen.navigationOptions = {
  title: 'Today',
};
