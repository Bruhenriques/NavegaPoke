import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return <GestureHandlerRootView style={{ flex: 1 }}><SafeAreaProvider><AppProvider><Navigation /></AppProvider></SafeAreaProvider></GestureHandlerRootView>;
}
