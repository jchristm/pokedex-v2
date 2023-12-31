import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import MainApp from './src/components/MainApp';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialState, setInitialState] = useState({
      isReady: false,
      client: null,
      store: null
  });
      

  useEffect(() => {
    async function initLoad() {
      try {
        const defaultOptions = {
          watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
          },
          query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
          },
        };

        const client = new ApolloClient({ 
             uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
             cache: new InMemoryCache(),
             defaultOptions
        });

        setInitialState ({ client });
        setIsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }

    initLoad();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    } 
  }, [isLoaded]);

  if (!isLoaded) {
      return null;
  }
  
  const { client, store } = initialState;
  return (
    <View
      style={styles.container}
      onLayout={onLayoutRootView}>
        <ApolloProvider client={client}>
          <MainApp />
      </ApolloProvider>
    </View>//
  
  );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   } 
});