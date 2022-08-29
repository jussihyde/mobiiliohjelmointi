import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { useState } from 'react';
export default function App() {
  const [text, setText] = useState(0);
const [text2, setText2] = useState(0);
const [result, setResult] = useState(0);
const buttonPressedAdd = () => {
  setResult(parseInt(text) + parseInt(text2))
};
const buttonPressedSub = () => {
  setResult(parseInt(text) - parseInt(text2))
};

  return (
    <><View style={styles.textResult}>
      <Text>Result: {result} </Text>
      <StatusBar style="auto" />
    
    <TextInput
      style={styles.input}
      onChangeText={text => setText(text)}
      value={text}
      keyboardType="numeric"
      />
      <TextInput
      style={styles.input}
      onChangeText={text2 => setText2(text2)}
      value={text2}
      keyboardType="numeric"
      />
      </View>
    <View style={styles.container}>
      <Button onPress={buttonPressedAdd} title="+" />
      <Button onPress={buttonPressedSub} title="-" />
      </View></>
  );
};

const styles = StyleSheet.create({
  textResult: {
    flex: 1, flexDirection: 'column',
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1, flexDirection: 'row',
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1, flexDirection: 'column',
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
