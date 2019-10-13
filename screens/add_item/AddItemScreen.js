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
  const [date, setDate] = React.useState(new Date());
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [task, setTask] = React.useState('');

  function handleFormSubmit() {
    if (task.length === 0) {
      alert('Task name cannot be empty!');
      return;
    }
    const currentDoc = db.collection('users').doc(auth.currentUser.uid);
    currentDoc.get().then(doc => {
      if (doc.data) {
        const oldTodos = doc.data().todos;
        currentDoc
          .set({
            todos: [
              ...oldTodos,
              {
                id: Math.random() + 'abc',
                title: task,
                date: date.toISOString(),
              },
            ],
          })
          .then(() => {
            navigation.navigate('Today');
          })
          .catch(err => {
            alert(err.message);
            navigation.navigate('Today');
          });
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
              <Text>{date ? date.toString() : ''}</Text>
            </Button>
          </Item>
          {showTimePicker && (
            <DatePickerIOS date={date} onDateChange={setDate} />
          )}
          <Button onPress={handleFormSubmit}>
            <Text>Click Me!</Text>
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
