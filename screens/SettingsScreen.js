import React from 'react';
import {
  AsyncStorage,
  Text,
  View,
  ScrollView,
  Button,
  StyleSheet,
} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import { auth } from '../firebase';

export default function SettingsScreen({ navigation }) {
  function logout() {
    auth.signOut();
    navigation.navigate('Auth');
  }

  async function askPermissions() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    return finalStatus === 'granted';
  }
  async function sendNotificationImmediately() {
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: 'This is crazy',
      body: 'Your mind will blow after reading this',
    });
  }
  async function scheduleNotification() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: 'Time to work on Chapter 5.1 Math Homework!',
        body: 'Chapter 5.1 Math Homework is scheduled for right now!',
      },
      {
        time: new Date().getTime() + 8000,
      }
    );
  }
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return (
    <ScrollView style={styles.container}>
      <View style={styles.appFocusView}>
        <Text style={styles.title}>Focus</Text>
        <Text style={styles.subtitle}>1.0.0</Text>
      <Text style={styles.email}>{auth.currentUser.email}</Text>
      </View>
      <Button title="Logout" onPress={logout} />
      <Button title="Send Notification" onPress={sendNotificationImmediately} />
      <Button title="Schedule Notification" onPress={scheduleNotification} />
      <Button
        title="Ask for Notification permissions"
        onPress={askPermissions}
      />
    </ScrollView>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({
  appFocusView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 48,
  },
  subtitle: {
    fontSize: 24,
  },
  container: {
    padding: 20,
  },
  email: {
    fontSize: 24,
    marginTop: 40,
  },
});
