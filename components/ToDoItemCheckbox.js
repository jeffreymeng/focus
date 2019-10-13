import React from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight } from "react-native";
import Icon from "./Icon";

export default function ToDoItemCheckbox(props) {
  return (
      <TouchableHighlight

          style = {this.state.checked ? [styles.checkbox, styles.checkboxChecked] : styles.checkbox}
          underlayColor = '#ccc'
          onPress = { props.onPress }
      >

        <CheckboxIcon checked={props.checked}/>

      </TouchableHighlight>
  )
}
function CheckboxIcon(props) {
  if (props.checked) {
    return (<Icon
        name={
          Platform.OS === 'ios'
              ? `ios-checkmark`
              : 'md-done'
        }
        style={[styles.checkicon, {display:'none'}]}
        size={40}
        color={'#ffffff'}
    />)
  } else {
    return (
        <Text></Text>
    )
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius:8,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 12,
  },
  checkbox:{
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor:'#e6ecff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:6,
    borderColor:'#809fff',

  },
  checkboxChecked:{

    backgroundColor:'#809fff',
    borderWidth:1,
    borderColor:'#809fff'

  },
  checkIcon:{
    justifyContent:'center',
    alignItems:'center',

  }
});