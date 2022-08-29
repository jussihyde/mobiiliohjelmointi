import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { useState } from 'react';

let randomNumber = (Math.floor(Math.random() * 100) + 1);

export default function App() {

  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(1);
  const [text, setText] = useState('Guess a number between 1-100');
  function buttonPressed() {
    setCount(count + 1);
    if (number == randomNumber) {
      
      Alert.alert(`You guessed the number in ${count} guesses`);
    }
    if (number > randomNumber) {
      
      setText(`Your guess ${number} is too high`)
    }
    if (number < randomNumber) {
      
      setText(`Your guess ${number} is too low`)
    }
  }
  

  return (
    <><View style={styles.container}>
      <Text>{text}</Text>
      <StatusBar style="auto" />
    </View>
    <View>
        <TextInput style={styles.input}
          onChangeText={number => setNumber(number)}
          value={number}
          keyboardType="numeric" />
      </View>
      <View style={styles.container}>
        <Button onPress={buttonPressed} title="Make Guess" />
      </View></>
      
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'column',
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  input: {
    
    
    justifyContent: 'center',
    backgroundColor: '#aaa',
    width: 120,
    height: 60,
    padding: 10,
    borderWidth: 2,

  },
});
