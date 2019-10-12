import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,

} from 'react-native';
import ToDoListItem from '../components/ToDoListItem';
import Constants from 'expo-constants';
import db from './firebase';

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


export default function ToDoList() {
  const [selected, setSelected] = React.useState(new Map());
  const [data, setData] = React.useState([]);

  const onSelect = React.useCallback(
      id => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));

        setSelected(newSelected);
      },
      [selected],
  );

  React.useEffect(() => {
    db.collection('users').doc('john').get().then(doc => {
      if (doc.exists) {
        setData(doc.data().todo);
      }
    })
  });

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <ToDoListItem
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

});
