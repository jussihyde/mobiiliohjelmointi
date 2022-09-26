import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from'react-native-maps';
import * as Location from 'expo-location';

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
      Alert.alert(error)
        };
      };

  const inputLocation = {
    latitude: inputLat,
    longitude: inputLng
  };

  
  const [location, setLocation] = useState(null); 
  const [startLat, setStartLat] = useState(0);
  const [startLng, setStartLng] = useState(0);

  const locationBasis = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setLocation(location);
    setStartLat(location.coords.latitude);
    setStartLng(location.coords.longitude);
  };

  useEffect(() => {
    locationBasis();
}, []); 
    

  const startLocation = {
      latitude: startLat,
      longitude: startLng,
      latitudeDelta: 1.0000,
      longitudeDelta: 1.0000,
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