import React, { Component } from 'react';

import { StyleSheet, DatePickerIOS } from 'react-native';
import {
  Container,
  View,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  Label,
} from 'native-base';

import { db, auth } from '../../firebase';

export default function AddItemScreen({ navigation }) {
  const params = navigation.state.params;
  let today = new Date();

  const [date, setDate] = React.useState(params.date ? params.date : params.from === "Today" ? today : today.setDate(today.getDate() + 1));
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [task, setTask] = React.useState(params.title || '');

  function handleFormSubmit() {
    if (task.length === 0) {
      alert('Please enter a task name');
      return;
    }
    const currentDoc = db.collection('users').doc(auth.currentUser.uid);
    let item = {
      title: task,
      id: new Array(32).fill("").map(() => "ABCDEFGHIJKLMNOPQRSTUVQXYZabcdefghijklmnopqrstuvwxyz0123456789".split("")[Math.floor(Math.random() * (26 * 2 + 10))]).join(""),
      date: date.toISOString(),
      checked: params.checked || false,
    };

      currentDoc.get().then(doc => {
        if (doc.data) {
          let data = doc.data().todos;
          let item = {
            title: task,
            id: new Array(32).fill("").map(() => "ABCDEFGHIJKLMNOPQRSTUVQXYZabcdefghijklmnopqrstuvwxyz0123456789".split("")[Math.floor(Math.random() * (26 * 2 + 10))]).join(""),
            date: date.toISOString(),
            checked: false
          };
          console.log(params.updateIndex)
          if (params.updateIndex) {
            data[updateIndex] = item;
            db
                .collection('users')
                .doc(userId)
                .update("todos",data);
          } else {
            currentDoc
                .set({
                  todos: doc.data().todos ? [...doc.data().todos, item] : [item],
                })
                .then(() => {
                  navigation.navigate(params.from);
                })
                .catch(err => {
                  alert(err.message);
                  navigation.navigate(params.from);
                });
          }
        }
      });

  }

  return (
      <Container>
        <Content style={styles.container}>
          <Form>
            <Item inlineLabel>
              <Label>Add Task</Label>
              <Input value={task} onChangeText={setTask} />
            </Item>
            <Item inlineLabel>
              <Label>Schedule Time</Label>
              <Button
                  hasText
                  transparent
                  onPress={() => setShowTimePicker(!showTimePicker)}
              >
                <Text>{date ? (date.getHours() % 12) + ":" + ((date.getMinutes() > 9 ? "" : "0") + date.getMinutes()) + " " + (date.getHours() > 12 ? "PM" : "AM") : ''}</Text>
              </Button>
            </Item>
            {showTimePicker && (
                <DatePickerIOS date={date} onDateChange={setDate} mode={"time"}/>
            )}
            <Button onPress={handleFormSubmit}>
              <Text>Add Item</Text>
            </Button>
          </Form>
        </Content>
      </Container>
  );
}

AddItemScreen.navigationOptions = {
  title: 'New Todo',
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});