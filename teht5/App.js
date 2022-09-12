import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  
  const [text, setText] = useState(0);
  const [text2, setText2] = useState(0);
  const [result, setResult] = useState(0);
  const [data, setData] = useState([]);

  const initialFocus = useRef(null);

  const calculate = operator => {
    const [number, number2] = [Number(text), Number(text2)];

    if (isNaN(number) || isNaN(number2)) {
    setResult(0);
    } else {
    let result = 0;
    switch (operator) {
      case '+':
        result = number + number2;
        break;
      case '-':
        result = number - number2;
    }
    setResult(result);

    const phrase = `${number} ${operator} ${number2} = ${result}`;
    setData([...data, phrase]);
    }

    setText('');
    setText2('');
    initialFocus.current.focus();
  }
  return (
    <><View style={styles.textResult}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        ref={initialFocus}
        onChangeText={text => setText(text)}
        value={text}
        keyboardType="numeric" />
      <TextInput
        style={styles.input}
        onChangeText={text2 => setText2(text2)}
        value={text2}
        keyboardType="numeric" />
    </View><View style={styles.container}>
        <Button onPress={() => calculate('+')} title="+" />
        <Button onPress={() => calculate('-')} title="-" />
        <Button onPress={() => navigation.navigate('History', { data: data })} title='History' />
      </View></>
  );
};

function History({ route }) {
  const { data } = route.params;

  return (
    <><View style={styles.textResult}>
        <Text>History</Text>
      <FlatList style={styles.list}
        data={data}
        keyExtractor={ (item, index) => index }
        renderItem={({ item }) =>
          <Text>{item}</Text>
        }
      />
      </View></>
  )
};

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={HomeScreen} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
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
