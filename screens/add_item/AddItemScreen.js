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
  let initialDate =
    params.from === 'Today' ? today : new Date(today.setDate(today.getDate() + 1));
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
      .add({
        title: task,
        date: date.toISOString(),
        checked: false,
      }).then(() => {
        navigation.navigate(params.from)
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
