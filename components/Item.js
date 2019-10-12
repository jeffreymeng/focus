import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

export default function Item({ id, title, subtitle, selected, onSelect }) {
  return (
      <TouchableOpacity
          onPress={() => onSelect(id)}
          style={[
            styles.item,
            { backgroundColor: selected ? '#C0C0C0' : '#F0F0F0' },
          ]}
      >
        <View style={{flexDirection:'row'}}>
          <View
              style={{flex:1}}>
            <TouchableHighlight

                style = {styles.checkbox}
                underlayColor = '#ccc'
                onPress = { () => alert('Yaay!') }
            >
              <Text></Text>
            </TouchableHighlight>
          </View>
          <View
              style={{flex:3}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
  );
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
    backgroundColor:'#809fff',
    justifyContent: 'center',
    alignItems: 'center',

  }
});
