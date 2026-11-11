import React from 'react';
import { Image, Pressable, ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/Navigation';
import { useApp } from '../context/AppContext';
import { imageOf, nameOf } from '../services/pokeapi';

export default function DetailsScreen({ route }: NativeStackScreenProps<StackParams, 'Detalhes'>) {
  const { pokemon } = route.params;
  const { colors, favorites, toggleFavorite } = useApp();
  const favorite = favorites.some(item => item.id === pokemon.id);
  const uri = imageOf(pokemon);
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 24, alignItems: 'center', gap: 20 }}>
    <Text style={{ color: colors.muted }}>POKÉDEX • #{String(pokemon.id).padStart(3, '0')}</Text>
    {uri && <Image source={{ uri }} style={{ width: 240, height: 240, maxWidth: '100%' }} resizeMode="contain" />}
    <Text style={{ color: colors.text, fontSize: 32, fontWeight: '800' }}>{nameOf(pokemon.name)}</Text>
    <Text style={{ color: colors.text, fontSize: 18 }}>Tipo: {pokemon.types.map(item => nameOf(item.type.name)).join(' / ')}</Text>
    {/* A API retorna altura em decímetros e peso em hectogramas. */}
    <Text style={{ color: colors.text, fontSize: 18 }}>Altura: {(pokemon.height / 10).toLocaleString('pt-BR')} m</Text>
    <Text style={{ color: colors.text, fontSize: 18 }}>Peso: {(pokemon.weight / 10).toLocaleString('pt-BR')} kg</Text>
    <Pressable accessibilityRole="button" onPress={() => toggleFavorite(pokemon)} style={{ padding: 18, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}><Text style={{ color: colors.primary, fontWeight: '700' }}>{favorite ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos'}</Text></Pressable>
  </ScrollView>;
}
