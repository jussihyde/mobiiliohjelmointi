import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyC53cZkidIZKR5htT-2YDVDhCXoTnKFBZo",
    authDomain: "shoppinglist-6385a.firebaseapp.com",
    databaseURL: "https://shoppinglist-6385a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shoppinglist-6385a",
    storageBucket: "shoppinglist-6385a.appspot.com",
    messagingSenderId: "112853856528"};
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    ref(database,'items/')

    const [amount, setAmount] = useState('');
    const [product, setProduct] = useState('');
    const [items, setItems] = useState([]);

    const saveItem = () => {
        push(    
          ref(database, 'items/'),
            { 'product': product, 'amount': amount });
            console.log()
    }

    const [data, setData] = useState({});

    useEffect(() => {
    const itemsRef = ref(database, 'items/');
        onValue(itemsRef, (snapshot) => {
          setData(snapshot.val())
              setItems(Object.values(data));
              })
            }, []);

    const deleteItem = () => {
        remove(
          ref(database, 'items/'),
        )
        };
    
    
   
          
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
    keyExtractor={item => item.id} 
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