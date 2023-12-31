import React from 'react';
import Pokemon from '../features/pokemon/list';
import { StyleSheet, View, Text } from 'react-native';

export default function MainApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gen 1 Pokedex</Text>
      <Pokemon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40
  },
  header: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 40,
      backgroundColor: '#38a3fe',
      borderBottomWidth: 4,
      borderTopWidth: 4
  }
});