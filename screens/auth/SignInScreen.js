import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
} from 'react-native';
import { auth } from '../../firebase';

export default function LinksScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function loginFirebase() {
    auth.signInWithEmailAndPassword(username, password).then(
      ({ user }) => {
        navigation.navigate('Main');
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
      <Button title="Login" onPress={loginFirebase} />
      <View style={styles.buttonWrapper}>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
        <Button title="Reset Password" />
      </View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Sign In',
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
    marginTop: 300,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
