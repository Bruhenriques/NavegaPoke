import React from 'react';
import { Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useApp } from '../context/AppContext';
import { Pokemon } from '../services/pokeapi';
import PokemonScreen from '../screens/PokemonScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type StackParams = { Lista: undefined; FavoritosLista: undefined; Detalhes: { pokemon: Pokemon } };
const Stack = createNativeStackNavigator<StackParams>();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
function PokemonStack({ favorites = false }: { favorites?: boolean }) {
  const { colors } = useApp();
  return <Stack.Navigator screenOptions={{ headerTintColor: colors.text, headerStyle: { backgroundColor: colors.card } }}>
    {favorites ? <Stack.Screen name="FavoritosLista" component={FavoritesScreen} options={({ navigation }) => ({ title: 'Favoritos', headerLeft: () => <MenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())} /> })} />
    : <Stack.Screen name="Lista" component={PokemonScreen} options={({ navigation }) => ({ title: 'Pokémon', headerLeft: () => <MenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())} /> })} />}
    <Stack.Screen name="Detalhes" component={DetailsScreen} options={{ title: 'Detalhes', headerBackTitle: 'Voltar' }} />
  </Stack.Navigator>;
}
function MenuButton({ onPress }: { onPress: () => void }) {
  const { colors } = useApp();
  return <Pressable accessibilityRole="button" accessibilityLabel="Abrir menu" onPress={onPress} style={{ padding: 10, marginRight: 12 }}><Text style={{ color: colors.primary, fontSize: 24 }}>☰</Text></Pressable>;
}
function FavoritesStack() { return <PokemonStack favorites />; }
function HomeTabs() {
  const { colors } = useApp();
  return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarStyle: { backgroundColor: colors.card }, tabBarLabelStyle: { fontSize: 13 } }}>
    <Tabs.Screen name="PokemonTab" component={PokemonStack} options={{ title: 'Pokémon', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>◉</Text> }} />
    <Tabs.Screen name="FavoritesTab" component={FavoritesStack} options={{ title: 'Favoritos', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>♥</Text> }} />
  </Tabs.Navigator>;
}
export default function Navigation() {
  const { isDark, colors } = useApp();
  const base = isDark ? DarkTheme : DefaultTheme;
  return <><StatusBar style={isDark ? 'light' : 'dark'} /><NavigationContainer theme={{ ...base, colors: { ...base.colors, primary: colors.primary, background: colors.background, card: colors.card, text: colors.text, border: colors.border } }}>
    <Drawer.Navigator screenOptions={{ drawerActiveTintColor: colors.primary, headerTintColor: colors.text, headerStyle: { backgroundColor: colors.card } }}>
      <Drawer.Screen name="Inicio" component={HomeTabs} options={{ title: 'Início', headerShown: false }} />
      <Drawer.Screen name="Configuracoes" component={SettingsScreen} options={{ title: 'Configurações' }} />
    </Drawer.Navigator>
  </NavigationContainer></>;
}
