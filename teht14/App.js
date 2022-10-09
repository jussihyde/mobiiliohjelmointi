import  React, {useState} from 'react';
import { View, StyleSheet, Button, TextInput, Text } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [thingToSay, setThingToSay] = useState('');
  const speak = () => {
    Speech.speak(thingToSay);
  };



  return (
    <View style={styles.container}>
      <TextInput style={{fontSize:18, width:200, borderColor:'black'}} placeholder='Text to Speech' onChangeText={text => setThingToSay(text)} value={thingToSay} />
      <Button title="Press to hear text" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
