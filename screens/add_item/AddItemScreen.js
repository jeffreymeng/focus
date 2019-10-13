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

export default function AddItemScreen() {
  const [date, setDate] = React.useState(new Date());
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [task, setTask] = React.useState('');

  function handleFormSubmit() {
    console.log(`Adding a new tastk with label ${task} and date ${date}`);
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
