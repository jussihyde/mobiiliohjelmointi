import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from'react-native-maps';

export default function App() {

  const [address, setAddress] = useState('');
  const [inputLat, setInputLat] = useState(0);
  const [inputLng, setInputLng] = useState(0);
  const [KEY] = useState('5VlJ5p0GNTZpNXquVkoUtj4KwJPBRLkE')

  const getAddress = async () => {
    try {
    const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}`)
      const data = await response.json();
      setInputLat(data.results[0].locations[0].latLng.lat)
      setInputLng(data.results[0].locations[0].latLng.lng)
     } catch(error) {
          
        };
      };

  const inputLocation = {
    latitude: inputLat,
    longitude: inputLng
  };

  return (
    <View style={styles.container}>
      
      <MapView 
        style={{ flex: 1, width: "100%",
        height: "100%" }}
        initialRegion={{
          latitude: 60.500000,
          longitude: 25.000000,
          latitudeDelta: 1.0000,
          longitudeDelta: 1.0000,
        }}>
        <Marker
        coordinate={inputLocation}
          title='Your location' />
      </MapView>
      <TextInput style={{fontSize:18, width:200}} placeholder='Give address' onChangeText={text => setAddress(text) } />
      <Button title="Show" onPress= {getAddress} />
      <StatusBar style="auto" />
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
