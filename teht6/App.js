import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async () => {
    try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      const data = await response.json();
      setRepositories(data.meals)
     } catch(error) {
          Alert.alert('Error', error);
        };
      };

  const listSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "#CED0CE",
              marginLeft: "10%"
            }}
          />
        );
      };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) =>
        <View>
          <Text style={{fontSize:18, fontWeight: "bold"}}>{item.strMeal}</Text>
          <Image style={styles.logo} source={{uri: item.strMealThumb}}/>
        </View> }
        data={repositories} 
        ItemSeparatorComponent={listSeparator}
        />

      <TextInput style={{fontSize:18, width:200}} placeholder='keyword' onChangeText={text => setKeyword(text) } />
      <Button title="Find" onPress= {getRepositories} />
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
  logo: {
    width: 66,
    height: 58,
  },
});
