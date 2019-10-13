import React, { Component } from 'react';

import {
  StyleSheet,
  Alert,
  DatePickerIOS,
  Dimensions,
  View,
  ScrollView,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  Label,
} from 'native-base';

import { db, auth } from '../../firebase';

export default function WorkingScreen({ navigation }) {
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const params = navigation.state.params;
  const todo = params.todo;

  function finishTodo() {
    Alert.alert(
      'Are you finished with your task?',
      '',
      [
        { text: 'No', onPress: () => {}, style: 'default' },
        {
          text: 'Yes',
          style: 'cancel',
          onPress: () => {
            const todoId = todo.id;
            delete todo.id;
            db.collection('users')
              .doc(auth.currentUser.uid)
              .collection('todos')
              .doc(todoId)
              .set({
                ...todo,
                checked: true,
              })
              .then(() => {
                db.collection('users')
                  .doc(auth.currentUser.uid)
                  .get()
                  .then(doc => {
                    const username = doc.data().username;
                    db.collection('feed')
                      .add({
                        completed: todo.title,
                        hotStreak: false,
                        name: username,
                        time: new Date().getTime(),
                      })
                      .then(() => {
                        navigation.navigate(params.from);
                      });
                  });
              });
          },
        },
      ],
      { cancelable: false }
    );
  }

  function snoozeTodo() {
    Alert.alert(
      'Snooze todo?',
      `Are you sure you want to snooze this task to ${date.getHours()}:${date.getMinutes()} ${
        date.getHours() > 12 ? 'PM' : 'AM'
      }?`,
      [
        { text: 'No', onPress: () => {}, style: 'default' },
        {
          text: 'Yes',
          style: 'cancel',
          onPress: () => {
            const todoId = todo.id;
            delete todo.id;
            db.collection('users')
              .doc(auth.currentUser.uid)
              .collection('todos')
              .doc(todoId)
              .set({
                ...todo,
                date: date.toISOString(),
              })
              .then(() => {
                navigation.navigate(params.from);
              });
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Form>
          <Text>You are now working on</Text>
          <Text style={styles.mainText}>{todo.title}</Text>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={finishTodo}>
              <Text>Finish</Text>
            </Button>
            <Button
              style={styles.button}
              danger
              onPress={() => setShowTimePicker(!showTimePicker)}
            >
              <Text>Snooze</Text>
            </Button>
          </View>
        </Form>
      </View>
      {showTimePicker && (
        <View style={styles.timePicker}>
          <DatePickerIOS date={date} onDateChange={setDate} mode={'time'} />
          <Button style={styles.button} onPress={snoozeTodo}>
            <Text>Done</Text>
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

// WorkingScreen.navigationOptions = {
//   title: 'Working on',
// };

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: "flex",
    paddingTop: 30,
  },
  mainText: {
    fontSize: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },
  timePicker: {
    padding: 10,
  },
});
