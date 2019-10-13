import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default function AuthLoadingScreen({ navigation }) {
  React.useEffect(() => {
    const _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      navigation.navigate(userToken ? 'Main' : 'Auth');
    };

    _bootstrapAsync().then();
  });

  // Fetch the token from storage then navigate to our appropriate place

  // Render any loading content that you like here
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
