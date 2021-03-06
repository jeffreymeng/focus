import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Icon from '../components/Icon';
import TodayScreen from '../screens/today/TodayScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FeedScreen from "../screens/feed/FeedScreen";
import AddFriendScreen from "../screens/feed/AddFriendScreen";
import AddItemScreen from "../screens/add_item/AddItemScreen";
import EditItemScreen from "../screens/edit_item/EditItemScreen";
import WorkingScreen from "../screens/working/WorkingScreen";
import TomorrowScreen from "../screens/tomorrow/TomorrowScreen";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const TodayStack = createStackNavigator(
  {
    Today: TodayScreen,
    AddItem: AddItemScreen,
    Working: WorkingScreen,
    EditItem: EditItemScreen,
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

const TomorrowStack = createStackNavigator(
  {
    Tomorrow: TomorrowScreen,
    AddItem: AddItemScreen,
    Working: WorkingScreen,
    EditItem: EditItemScreen,
  },
  config
);

TomorrowStack.navigationOptions = {
  tabBarLabel: 'Tomorrow',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-time`
          : 'md-schedule'
      }
    />
  ),
};

TomorrowStack.path = '';

const FeedStack = createStackNavigator(
  {
    Feed: FeedScreen,
    AddFriend : AddFriendScreen,
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
  TomorrowStack,
  FeedStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
