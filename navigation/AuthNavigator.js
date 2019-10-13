import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/auth/SignInScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const authStack = createStackNavigator({
  SignIn: SignInScreen,
  Register: RegisterScreen,
});

export default authStack;
