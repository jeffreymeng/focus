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

export default function AddFriendScreen({ navigation }) {
  console.log(navigation.state.params.from);
  return (
    <Container>
      <Content style={styles.container}>
        <Form>
          <Item inlineLabel>
            <Label>Friend email</Label>
            <Input />
          </Item>
          <Button
            onPress={() => navigation.navigate(navigation.state.params.from)}
          >
            <Text>Add Friend</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

AddFriendScreen.navigationOptions = {
  title: 'Add Friend',
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
