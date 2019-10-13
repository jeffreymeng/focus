import React from 'react';
import {Fab, Icon, View} from 'native-base';
import TabIcon from "../../components/Icon";

import ToDoList from '../../components/ToDoList';
import {auth, db} from '../../firebase';
import {Platform} from "react-native";

export default function TomorrowScreen({ navigation }) {
  const [todoItems, setTodoItems] = React.useState([]);
  const userId = auth.currentUser.uid;

  React.useEffect(() => {
    db.collection('users')
      .doc(userId)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().todos) {
          setTodoItems(doc.data().todos.filter(x => new Date(x.date).getDate() === new Date().getDate() + 1));
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <View style={{height: "100%"}}>
      <ToDoList todoItems={todoItems}/>
      <Fab
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        onPress={() => navigation.navigate("AddItem", {from:"Tomorrow"})}>
        <Icon name="add"/>
      </Fab>
    </View>
  );
}

TomorrowScreen.navigationOptions = {
  title: 'Tomorrow',
};
