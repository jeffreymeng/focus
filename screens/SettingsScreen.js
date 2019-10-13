import React from 'react';
import { AsyncStorage, ScrollView, Button, StyleSheet } from 'react-native';

import { auth } from '../firebase';

export default function SettingsScreen({ navigation }) {
  function logout() {
    auth.signOut();
    navigation.navigate('Auth');
  }

  return (
    <ScrollView style={styles.container}>
      <Button title="Logout" onPress={logout} />
    </ScrollView>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
