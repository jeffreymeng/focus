import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
} from 'react-native';
import { auth, db } from '../../firebase';

export default function LinksScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function registerFirebase() {
    auth.createUserWithEmailAndPassword(username, password).then(
      ({ user }) => {
        db.collection('users')
          .doc(user.uid)
          .set({ todos: [] })
          .then(() => {
            navigation.navigate('Main');
          });
      },
      error => {
        alert(error.message);
      }
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <View style={styles.buttonWrapper}>
        <Button
          style={styles.registerBtn}
          title="Create Account"
          onPress={registerFirebase}
        />
      </View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Register',
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginBtn: {},
  registerBtn: {},
});
