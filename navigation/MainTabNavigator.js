import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Icon from '../components/Icon';
import TodayScreen from '../screens/today/TodayScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FeedScreen from "../screens/feed/FeedScreen";
import AddItemScreen from "../screens/add_item/AddItemScreen";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const TodayStack = createStackNavigator(
  {
    Today: TodayScreen,
    AddItem: AddItemScreen,
  },
  config
);

TodayStack.navigationOptions = {
  tabBarLabel: 'Today',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-calendar`
          : 'md-calendar_today'
      }
    />
  ),
};

TodayStack.path = '';

const FeedStack = createStackNavigator(
  {
    Feed: FeedScreen,
  },
  config
);

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <Icon focused={focused} name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} />
  ),
};

FeedStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <Icon focused={focused} name={Platform.OS === 'ios' ? 'ios-cog' : 'md-cog'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  TodayStack,
  FeedStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
