import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

interface Cat {
  _id: string;
  name: string;
}

const App: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [catName, setCatName] = useState<string>('');

  const fetchCats = async () => {
    try {
      const response = await axios.get('http://localhost:5001/cats');
      setCats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCat = async () => {
    if (!catName.trim()) return;
    try {
      const response = await axios.post('http://localhost:5001/cats', { name: catName });
      setCats([...cats, response.data]);
      setCatName('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCat = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/cats/${id}`);
      setCats(cats.filter(cat => cat._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cat List</Text>
      <FlatList
        data={cats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.catItem}>
            <Text style={styles.catText}>{item.name}</Text>
            <Button title="Delete" onPress={() => deleteCat(item._id)} />
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Cat name"
        value={catName}
        onChangeText={setCatName}
      />
      <Button title="Add Cat" onPress={addCat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5fcff',
  },
  catItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  catText: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default App;