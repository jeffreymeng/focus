import React, { Component } from "react";

import { Container, Content, Form, Item, Input, Text, Button, Label, } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class AddItemScreen extends Component {
  state = {
    date: null,
    showTimePicker: false,
    task: "",
  };

  setShowTimePicker = (value) => {
    this.setState({
      showTimePicker: value
    });
  };

  setDate = (date) => {
    this.setState({ date });
  };

  handleTaskChange = (task) => {
    this.setState({ task });
  };

  handleFormSubmit = () => {
    console.log("Adding a new task with label " + this.state.task + " and date " + this.state.date);
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>Add Task</Label>
              <Input  value={this.state.task} onChangeText={this.handleTaskChange}/>
            </Item>
            <Item inlineLabel last onPress={() => this.setShowTimePicker(true)}>
              <Label>Schedule Time</Label>
              <Input value={this.state.date?.toString()} disabled />
            </Item>
            <DateTimePicker
              isVisible={this.state.showTimePicker}
              onConfirm={date => {this.setDate(date); this.setShowTimePicker(false);}}
              mode="time"
              onCancel={() => this.setShowTimePicker(false)}
            />
            <Button onPress={this.handleFormSubmit}>
              <Text>Click Me!</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

AddItemScreen.navigationOptions = {
  title: "New Todo",
};