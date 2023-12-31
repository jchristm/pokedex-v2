import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { formatName } from '../../utils';
import { pokedex } from '../../../assets/pokedex.png'
import { LinearGradient } from 'expo-linear-gradient';

function SelectedPokemon(props) {
  const { loading, data, error } = useQuery(GetPokemonQuery, {
      variables: { name: props.name}
  });

  if(!data || (!!data.pokemon && !data.pokemon.id)) {
    return (
        <View  style={{borderTopWidth: 4, ...styles.container}}>
            <View>
                <Image 
                    style={styles.placeholder}
                    source={require('../../../assets/pokedex.png')}
                />
            </View>
        </View>
    );
  }

  const renderTypes = (pokeTypes) => {
    let combinedTypeArray = pokeTypes.join(", ");

    if(combinedTypeArray.length > 1) {
      return <Text style={styles.text}>Types: {combinedTypeArray}</Text>;
    }

    return <Text style={styles.text}>Type: {combinedTypeArray}</Text>;
  };
  
  const getTypesObject = (pokeTypes) => {
    let types = {
        hasMultiple: false,
        type: ""
    };
      
    let combinedTypeArray = [];
    pokeTypes.forEach((pType) => {
      combinedTypeArray.push(pType.type.name);
    });

    types.type = combinedTypeArray;
    types.hasMultiple = combinedTypeArray.length > 1;
    return types;
  };
  
  const colorTypes = (pokeTypes) => {
    let colorGradient = [];  
    pokeTypes.forEach((item) => {
        switch(item) {
            case 'water':
             colorGradient.push('#3999CF');
             break;
            case 'normal':
                colorGradient.push('lightgrey');
                break;
            case 'fire':
                colorGradient.push('#B92303');
                break;
            case 'fighting':
                colorGradient.push('#DF891B');    
                break;
            case 'flying':
                colorGradient.push('#6667C0');
                break;
            case 'grass':
                colorGradient.push('green');
                break;
            case 'poison':
                colorGradient.push('#432F64');
                break;
            case 'electric':
                colorGradient.push('#DFDA3D');
                break;
            case 'ground':
                colorGradient.push('#69581F');
                break;
            case 'psychic':
                colorGradient.push('#CA28E0');
                break;
            case 'rock':
                colorGradient.push('#1E6B42');
                break;
            case 'ice':
                colorGradient.push('#2ABBC4');
                break;
            case 'bug':
                colorGradient.push('#417654');
                break;
            case 'dragon':
                colorGradient.push('#628D71');
                break;
            case 'ghost':
                colorGradient.push('#9177A8');
                break;
            default:
                colorGradient.push('orange');
                colorGradient.push('red');
                break;
           }
    });
    
    // LinearGradient needs two colors to work
    if (colorGradient.length === 1) {
        colorGradient.push('white');
    }
    
    return colorGradient;
  };

  const { pokemon } = data;
  if(!!pokemon && pokemon.id) {
    const { id, name, height, weight, types } = pokemon;
    const { thumbnail } = props;
    const pokemonTypes = getTypesObject(types);

    return (
      <View style={styles.gradientContainer}>
        <LinearGradient 
            colors={colorTypes(pokemonTypes.type)}
            style={styles.container}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
        >
        <Image
          style={styles.image}
          source={{uri: thumbnail }}
        />
        <Text style={styles.text}>Id: {id}</Text>
        <Text style={styles.text}>Name: {formatName(name)}</Text>
        <Text style={styles.text}>Height: {height}</Text>
        <Text style={styles.text}>Weight: {weight}</Text>
        {renderTypes(pokemonTypes.type)}
        </LinearGradient>
      </View>
    );
  } 
};

const GetPokemonQuery = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
      weight
      types {
        type {
          name
        }
      }
    }
  }
`;

export default (SelectedPokemon);
    
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContext: 'center',
        width: '100%'
    },
    text: {
        fontWeight: 'bold'
    },
    placeholder: {
        height: 350,
        width: 350
    },
    gradientContainer: {
        flex: 1, 
        disply: 'flex', 
        width: '100%', 
        flexDirection: 'column' 
    },
    image: {
        height: 250,
        width: 250
    }
});