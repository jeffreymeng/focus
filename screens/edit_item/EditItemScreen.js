import React, { Component } from 'react';

import { StyleSheet, DatePickerIOS, Alert } from 'react-native';
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

export default function EditItemScreen({ navigation }) {
  const params = navigation.state.params;
  let today = new Date();

  let initialDate =
    params.from === 'Today' ? today : today.setDate(today.getDate() + 1);
  if (params.date) initialDate = params.date;
  const [date, setDate] = React.useState(initialDate);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [task, setTask] = React.useState(params.title || '');

  function handleFormSubmit() {
    if (task.length === 0) {
      alert('Please enter a task name');
      return;
    }
    db.collection('users')
      .doc(auth.currentUser.uid)
      .collection('todos')
      .doc(params.id)
      .set({
        title: task,
        date: date.toISOString(),
        checked: params.checked || false,
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => {
        navigation.navigate(params.from);
      });
  }

  function deleteTodo() {
    db.collection('users')
      .doc(auth.currentUser.uid)
      .collection('todos')
      .doc(params.id)
      .delete()
      .then(() => {
        navigation.navigate(params.from);
      });
  }
  function openDeleteAlert() {
    Alert.alert(
        "Delete '" + task + "'?",
        'It will be lost forever!',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Delete', style:'destructive', onPress: () => deleteTodo()},
        ],
        {cancelable: false},
    )
  }
  return (
    <Container>
      <Content style={styles.container}>
        <Form>
          <Item inlineLabel>
            <Label>Edit Task</Label>
            <Input value={task} onChangeText={setTask} />
          </Item>
          <Item inlineLabel>
            <Label>Schedule Time</Label>
            <Button
              hasText
              transparent
              onPress={() => setShowTimePicker(!showTimePicker)}
            >
              <Text>
                {date
                  ? (date.getHours() % 12) +
                    ':' +
                    ((date.getMinutes() > 9 ? '' : '0') + date.getMinutes()) +
                    ' ' +
                    (date.getHours() > 12 ? 'PM' : 'AM')
                  : ''}
              </Text>
            </Button>
          </Item>
          {showTimePicker && (
            <DatePickerIOS date={date} onDateChange={setDate} mode={'time'} />
          )}
          <Button style={styles.button} onPress={handleFormSubmit}>
            <Text>Done</Text>
          </Button>
          <Button style={styles.button} danger onPress={openDeleteAlert}>
            <Text>Delete</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

EditItemScreen.navigationOptions = {
  title: 'Edit Todo',
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    marginTop: 10,
  },
});
