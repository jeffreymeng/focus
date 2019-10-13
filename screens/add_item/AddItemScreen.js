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
=======
  setShowTimePicker = (value) => {
    console.log(value);
    this.setState({
      showTimePicker: value
    });
  };

  setDate = (date) => {
    this.setState({date});
  };

  handleTaskChange = (task) => {
    this.setState({task});
  };

  handleFormSubmit = () => {
    console.log("Adding a new task with label " + this.state.task + " and date " + this.state.date);
  };

  render() {
    return (
      <Container>
        <Content style={{paddingTop: 10}}>
          <Item inlineLabel>
            <Label>Add Task</Label>
            <Input value={this.state.task} onChangeText={this.handleTaskChange}/>
          </Item>

          <Button onPress={() => this.setShowTimePicker(true)}>
            <Text>Schedule Time</Text>
          </Button>

          <Text>{this.state.date && `Scheduled time: ${this.state.date.toString()}`}</Text>

          <DateTimePicker
            isVisible={this.state.showTimePicker}
            onConfirm={date => {
              this.setDate(date);
              this.setShowTimePicker(false);
            }}
            mode="time"
            onCancel={() => this.setShowTimePicker(false)}
          />

          <Button onPress={this.handleFormSubmit}>
            <Text>Add Task</Text>
          </Button>
        </Content>
      </Container>
    );
  }
>>>>>>> add tomorrow screen
}

AddItemScreen.navigationOptions = {
  title: 'New Todo',
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
