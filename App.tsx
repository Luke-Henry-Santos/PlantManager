import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading'
import Routes from './src/routes';

import { PlantContextProvider } from './src/context/PlantContext';
import { MyPlantsContextProvider } from './src/context/MyPlantsContext';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'

export default function App() {
  const [fontsLoaded] = useFonts({ Jost_400Regular, Jost_600SemiBold })

  if (!fontsLoaded) return <AppLoading />

  return (
    <PlantContextProvider>
      <MyPlantsContextProvider>
        <StatusBar style='auto' />
        <Routes />
      </MyPlantsContextProvider>
    </PlantContextProvider>
  );
}
