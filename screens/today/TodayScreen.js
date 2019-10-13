import React from 'react';
import ToDoList from '../../components/ToDoList';

export default function TodayScreen() {
  return (<ToDoList></ToDoList>)
}
TodayScreen.navigationOptions = {
  title: "Today",
};