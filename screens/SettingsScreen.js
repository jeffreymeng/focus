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

import { auth, db } from '../firebase';

export default function SettingsScreen({ navigation }) {
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    db.collection('users')
      .doc(auth.currentUser.uid)
      .get()
      .then(doc => setUsername(doc.data().username));
  }, []);

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
        time: new Date().getTime() + 5000,
      }
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.appFocusView}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
      </View>
      <Button title="Logout" onPress={logout} />
      {/*<Button title="Send Notification" onPress={sendNotificationImmediately} />
      <Button
        title="Schedule Notification after 5 seconds"
        onPress={scheduleNotification}
      />
      <Button
        title="Ask for Notification permissions"
        onPress={askPermissions}
      />*/}
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
  username: {
    fontSize: 28,
    marginTop: 40,
  },
  email: {
    fontSize: 20,
  },
});
