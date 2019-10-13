import React from 'react';
import { AsyncStorage, Text, View, ScrollView, Button, StyleSheet } from "react-native";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


import { auth } from '../firebase';

export default function SettingsScreen({ navigation }) {
  function logout() {
    auth.signOut();
    navigation.navigate('Auth');
  }

  this.askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log(false);
      return false;
    }
    console.log(true);
    return true;
  };
  this.sendNotificationImmediately = async () => {
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: 'This is crazy',
      body: 'Your mind will blow after reading this',
    });
    console.log(notificationId); // can be saved in AsyncStorage or send to server
  };
  this.scheduleNotification = async () => {
    let notificationId = Notifications.scheduleLocalNotificationAsync(
        {
          title: "I'm Scheduled",
          body: 'Not the same body! Sent at ' + (new Date() + ''),
        },
        {
          time: new Date().getTime() + 100,
        },
    );
    console.log(notificationId);
  };
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return (
    <ScrollView style={styles.container}>
      <Button title="Logout" onPress={logout} />
      <Button title="Send Notification" onPress={this.sendNotificationImmediately} />
      <Button title="Schedule Notification" onPress={this.scheduleNotification} />
      <Button title="Ask for Notification permissions" onPress={this.askPermissions} />
      <View style={styles.appInfoView}>
        <Text style={styles.title}>Focus</Text>
        <Text style={styles.subtitle}>1.0.0</Text>
      </View>
    </ScrollView>
  );
}



SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({
  appFocusView:{
    justifyContent: 'center',
    alignItems: 'center',
    padding:24,
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
});
