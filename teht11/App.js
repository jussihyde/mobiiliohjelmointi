import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists items (id integer primary key not null, amount text, product text);');
    }, null, updateList); 
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into items (amount, product) values (?, ?);', [amount, product]);    
      }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from items;', [], (_, { rows }) =>
        setItems(rows._array)
      ); 
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from items where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder='Product' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(product) => setProduct(product)}
        value={product}/>  
      <TextInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/>      
      <Button onPress={saveItem} title="Save" /> 
      <Text style={{marginTop: 28, fontSize: 20}}>Shopping list</Text>
      <FlatList 
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View style={styles.list}><Text style={{fontSize: 18}}>{item.product}, {item.amount}</Text>
        <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> bought</Text></View>} 
        data={items} 
        ItemSeparatorComponent={listSeparator} 
      />      
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
 list: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
 },
});