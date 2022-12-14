import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from'react-native-maps';

export default function App() {

  const [address, setAddress] = useState('');
  const [inputLat, setInputLat] = useState(0);
  const [inputLng, setInputLng] = useState(0);
  const [KEY] = useState('5VlJ5p0GNTZpNXquVkoUtj4KwJPBRLkE')
  const [startLat, setStartLat] = useState(60.500000);
  const [startLng, setStartLng] = useState(25.000000);
  const [inputLatD, setInputLatD] = useState(1.0000);
  const [inputLngD, setInputLngD] = useState(1.0000);

  const getAddress = async () => {
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
        style={{ flex: 1, width: "100%",
        height: "100%" }}
        region={startLocation}>
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
