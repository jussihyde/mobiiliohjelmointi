import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { Marker } from 'react-native-maps';
import { Icon } from'react-native-elements';
import { Input, ListItem, Button } from'react-native-elements';
import * as SQLite from'expo-sqlite';

const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase('placefinderdb.db');

function PlacesScreen({ navigation }) {
  const [address, setAddress] = useState('');
  
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists addresses (id integer primary key not null, address text);');
    }, null, updateList); 
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into addresses (address) values (?);', [address]);    
      }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresses;', [], (_, { rows }) =>
        setAddresses(rows._array)
      ); 
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from addresses where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const renderItem = ({item}) => (
    <ListItem onLongPress = {() => {deleteItem(item.id)}} onPress = {() => {getAddress(item.address); navigation.navigate('Map', {inputLat: inputLat, inputLng: inputLng, startLat: startLat, startLng: startLng, inputLatD: inputLatD, inputLngD: inputLngD});}}>
      <ListItem.Content >
        <ListItem.Title >{item.address}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  )

  const [inputLat, setInputLat] = useState(0);
  const [inputLng, setInputLng] = useState(0);
  const [startLat, setStartLat] = useState(60.500000);
  const [startLng, setStartLng] = useState(25.000000);
  const [inputLatD, setInputLatD] = useState(1.0000);
  const [inputLngD, setInputLngD] = useState(1.0000);

  const [KEY] = useState('5VlJ5p0GNTZpNXquVkoUtj4KwJPBRLkE')

  const getAddress = async (address) => {
    
    try {
    const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}`)
      const data = await response.json();
      setInputLat(data.results[0].locations[0].latLng.lat)
      setInputLng(data.results[0].locations[0].latLng.lng)
      setStartLat(data.results[0].locations[0].latLng.lat)
      setStartLng(data.results[0].locations[0].latLng.lng)
      setInputLatD(0.0033)
      setInputLngD(0.0033)

     } catch(error) {
          
        };
      };

  
  
  return (
    <View>
    <StatusBar style="auto" />
    <Input placeholder='Type in address' label='PLACEFINDER' style={{ marginTop: 5, marginBottom: 5,  fontSize:15, width: 200}}
      onChangeText={(address) => setAddress(address)}
      value={address}/>      
    <Button raised icon={{name: 'save', color: 'white'}} onPress={saveItem} title="SAVE" /> 
    <FlatList
      keyExtractor={item => item.id.toString()} 
      renderItem={renderItem}
      data={addresses} 
       
    />
  </View>
  );
}




function MapScreen({ route }) {
  const {inputLat} = route.params;
  const {inputLng} = route.params;
  const {startLat} = route.params;
  const {startLng} = route.params;
  const {inputLatD} = route.params;
  const {inputLngD} = route.params;

  const inputLocation = {
    latitude: inputLat,
    longitude: inputLng
  };

  const startLocation = {
    latitude: startLat,
    longitude: startLng,
    latitudeDelta: inputLatD,
    longitudeDelta: inputLngD,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={startLocation}
      >
        <Marker
          coordinate={inputLocation}
        />
      </MapView>
    </View>
  );
}

export default function App() {
  

    

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Places" component={PlacesScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
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
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});