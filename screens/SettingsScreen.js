import React from 'react';
import { AsyncStorage, ScrollView, Button } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

import { auth } from '../firebase';

export default function SettingsScreen({ navigation }) {
  function logout() {
    auth.signOut();
    navigation.navigate('Auth');
  }

  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return (
    <ScrollView>
      <Button title="Logout" onPress={logout} />
      <ExpoConfigView />
    </ScrollView>
  );
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
