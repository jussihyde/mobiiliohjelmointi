import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Icon, Input, Button, ListItem } from'react-native-elements';

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

  const renderItem = ({item}) => (
    <ListItem bottomDivider>
      <ListItem.Content >
        <ListItem.Title >{item.product}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
        <Icon name='delete' color='red' onPress={() => deleteItem(item.id)} />
      </ListItem.Content>
    </ListItem>
  )

  return (
    <View >
      <StatusBar style="auto" />
      <Header
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
        />
      <Input placeholder='Product' label='PRODUCT' style={{marginTop: 5, fontSize: 18, width: 200}}
        onChangeText={(product) => setProduct(product)}
        value={product}/>  
      <Input placeholder='Amount' label='AMOUNT' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200}}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/>      
      <Button raised icon={{name: 'save', color: 'white'}} onPress={saveItem} title="SAVE" /> 
      <FlatList 
        keyExtractor={item => item.id.toString()} 
        renderItem={renderItem}
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
  alignItems: 'center',
  width: 200
 },
});