import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {
  const [contact, setContact] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContact(data);
      }
    }
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
  <View style={styles.container} >
      <FlatList 
        keyExtractor={item => item.id}
        renderItem={({item}) =>
         <View style={styles.list}>
          <Text style={{fontSize: 18}}>{item.name} {item.phoneNumbers[0].number}</Text>
        </View>}
        data={contact}  
      ItemSeparatorComponent={listSeparator}
      />
      <Button style={styles.button} title="Get contacts" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
  button: {
    paddingBottom: 10,
  },
});
