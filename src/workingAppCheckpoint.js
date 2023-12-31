import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from "@apollo/client/link/batch-http";

import configureStore from './store';
import MainApp from './src/components/MainApp';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
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
        
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    initLoad();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      
      await SplashScreen.hideAsync();
    } 
  }, [isReady]);

  if (!isReady) {
      return null;
  }
  
  const { client, store } = initialState;
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
        <ApolloProvider client={client}>
          <MainApp />
      </ApolloProvider>
    </View>//
  
  );
}