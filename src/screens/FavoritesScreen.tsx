import React from 'react';
import { FlatList, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/Navigation';
import { useApp } from '../context/AppContext';
import PokemonCard from '../components/PokemonCard';

export default function FavoritesScreen({ navigation }: NativeStackScreenProps<StackParams, 'FavoritosLista'>) {
  const { colors, favorites } = useApp();
  return <FlatList style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 20, flexGrow: 1 }} data={favorites} keyExtractor={item => String(item.id)} ListEmptyComponent={<Text style={{ color: colors.muted, textAlign: 'center', marginTop: 40 }}>Você ainda não tem favoritos. Adicione um Pokémon na tela inicial.</Text>} renderItem={({ item }) => <PokemonCard pokemon={item} onPress={() => navigation.navigate('Detalhes', { pokemon: item })} />} />;
}
