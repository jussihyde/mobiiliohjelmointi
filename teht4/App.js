import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const buttonPressedAdd = () => {
    setData([...data, { key: text }]);
    setText('');
  }

  const buttonPressedClear = () => {
    setData([]);
    setText('');
  }

  return (
    <><View style={styles.container}>
      <TextInput style={styles.input} onChangeText={text => setText(text)} value={text} />
      <StatusBar style="auto" /> 
      <Text>Ostoslista</Text>
        <FlatList style={styles.list}
          data={data}
          renderItem={({ item }) => <Text>{item.key}</Text>} />
      </View>
      <View styles={styles.button}>
        <Button onPress={buttonPressedAdd} title="Add" />
        <Button onPress={buttonPressedClear} title="Clear" />
      </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    marginTop: 50,
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1 
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    
});