import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { Pokemon, imageOf, nameOf } from '../services/pokeapi';

export default function PokemonCard({ pokemon, onPress }: { pokemon: Pokemon; onPress: () => void }) {
  const { colors, favorites, toggleFavorite } = useApp();
  const favorite = favorites.some(item => item.id === pokemon.id);
  const uri = imageOf(pokemon);
  return <View style={{ backgroundColor: colors.card, borderRadius: 20, marginBottom: 14, padding: 16, borderWidth: 1, borderColor: colors.border }}>
    <Pressable accessibilityRole="button" accessibilityLabel={`Ver detalhes de ${pokemon.name}`} onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
      {uri ? <Image source={{ uri }} style={{ width: 88, height: 88 }} resizeMode="contain" /> : <Text>Sem imagem</Text>}
      <View><Text style={{ color: colors.muted }}>#{String(pokemon.id).padStart(3, '0')}</Text><Text style={{ color: colors.text, fontSize: 22, fontWeight: '700' }}>{nameOf(pokemon.name)}</Text><Text style={{ color: colors.muted }}>Toque para conhecer →</Text></View>
    </Pressable>
    <Pressable accessibilityRole="button" onPress={() => toggleFavorite(pokemon)} style={{ paddingVertical: 12, marginTop: 8 }}><Text style={{ color: colors.primary, fontWeight: '700' }}>{favorite ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos'}</Text></Pressable>
  </View>;
}
