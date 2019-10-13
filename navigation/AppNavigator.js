import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStack from './AuthNavigator';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      Main: MainTabNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
