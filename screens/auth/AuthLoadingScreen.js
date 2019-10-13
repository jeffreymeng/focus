import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { auth } from '../../firebase';

export default function AuthLoadingScreen({ navigation }) {
  React.useEffect(
    () =>
      auth.onAuthStateChanged(user => {
        navigation.navigate(user ? 'Main' : 'Auth');
      }),
    []
  );

  // Fetch the token from storage then navigate to our appropriate place

  // Render any loading content that you like here
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 300,
  },
});
