import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import { Picker } from "@react-native-picker/picker";

function App() {
  let [result, setResult] = useState('');
  const [symbols, setSymbols] = useState('');
  const [amount, setAmount] = useState('');
  const [exchange, setExchange] = useState('');

  const getExchange = async() => {

  var myHeaders = new Headers();
    myHeaders.append("apikey", "TFlgFXXFiifLaP3gmUWNkcgrgtYueHwN");

  var requestOptions = {
   method: 'GET',
   redirect: 'follow',
    headers: myHeaders
  };

try {
const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=GBP,USD,JPY&base=EUR`, requestOptions)
  const data = await response.json();
  setExchange(data.rates[symbols]);
  console.log(exchange)
} catch(error) {console.log('error', error)};

  
    

    result = amount / exchange;
console.log(amount, exchange, result)
    setResult = result;
}


  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{result}</Text>
      <TextInput keyboardType="numeric" style={{fontSize:18, width:200}} placeholder='Please give the amount' onChangeText={text => setAmount(text) } />
      <Picker
        selectedValue={symbols}
        onValueChange={(value, index) => setSymbols(value)}
        mode="dropdown"
        style={styles.picker}
      >
        <Picker.Item label="Please select your currency" value="Unknown" />
        <Picker.Item label="GBP" value="GBP" />
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="JPY" value="JPY" />
      </Picker>
      <Button title="Convert" onPress= {getExchange} />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
  text: {
    fontSize: 24,
  },
  picker: {
  
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },
});
