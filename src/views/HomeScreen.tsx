import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const handleStartGame = () => {
    if (name.trim() !== '') {
      navigation.navigate('Game');
    } else {
      alert('Por favor, ingrese su nombre antes de comenzar el juego.');
    }
  };

  const handleViewScores = () => {
    navigation.navigate('Score');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ingrese su nombre"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Comenzar Juego" onPress={handleStartGame} color="#B5EAD7" />
        <Button title="Ver Puntajes" onPress={handleViewScores} color="#FFE6CC" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFCCCC',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default HomeScreen;
