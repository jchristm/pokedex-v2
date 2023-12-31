import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,  SafeAreaView, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client'
import SelectedPokemon from './selectedPokemon';
import { formatName } from "../../utils";

function Pokemon() {
  const [pokemonState, setPokemonState] = useState({ selectedPokemon: null });
  
  const onSelectItem = (item) => {
    setPokemonState({ selectedPokemon: item });
  };

  const { loading, data, error } = useQuery(GetLotsOfPokemonQuery);
  if (loading) return (<View><Text></Text></View>);
  
  const { selectedPokemon } = pokemonState;
  const { pokemons } = data;
  let pokemonName = (!!selectedPokemon) ? selectedPokemon.name : "";
  let thumbnail = (!!selectedPokemon) ? selectedPokemon.artwork : "";
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={styles.row}>
            <View style={styles.container}>
              {pokemons && <FlatList
                data={pokemons.results}
                keyExtractor={(item, index) => item + index}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => { onSelectItem(item);} }>
                      <Text style={{borderWidth: 1, fontSize: 14, padding: 10}} key={item.id}>
                        {formatName(item.name)}
                        </Text>
                    </TouchableOpacity>
                  );
                }}
              />
              }
            </View>
          </View>
        </View>
        {
          <View style={styles.listText}>
            <SelectedPokemon name={pokemonName} thumbnail={thumbnail} />
          </View>
        }
      </View>
    </SafeAreaView>
  );
};


const GetLotsOfPokemonQuery = gql`
  query GetLotsOfPokemon {
    pokemons(limit: 151, offset: 0) {
      count
      results {
        id
        name
        image
        artwork
      }
    }
  }
`;

export default (Pokemon);
    
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  column: {
      flexDirection: 'column',
      flex: 0.5
  },
  row: {
      flexDirection: 'row'
  },
  listText: {
      flex: 0.5, 
      flexDirection: 'column', 
      alignItems: 'center'
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