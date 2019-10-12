import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import Constants from 'expo-constants';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Do Math Homework',
    subtitle:'subtitle',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Do Chem Homework',
    subtitle:'subtitle',

  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Feed the cat',
    subtitle:'subtitle',

  },
];

function Item({ id, title, subtitle, selected, onSelect }) {
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

export default function App() {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
          id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
          },
          [selected],
  );

  return (
          <SafeAreaView style={styles.container}>
            <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                            <Item
                                    id={item.id}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    selected={!!selected.get(item.id)}
                                    onSelect={onSelect}
                            />
                    )}
                    keyExtractor={item => item.id}
                    extraData={selected}
            />
          </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
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
