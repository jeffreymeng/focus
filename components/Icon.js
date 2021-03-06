import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function Icon(props) {
  return (
    <Ionicons
      name={props.name}
      size={props.size || 26}
      style={{ marginBottom: -3 }}
      color={props.color ? props.color : props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
