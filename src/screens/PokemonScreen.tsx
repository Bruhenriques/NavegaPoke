import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/Navigation';
import { useApp } from '../context/AppContext';
import { fetchPokemon, Pokemon } from '../services/pokeapi';
import PokemonCard from '../components/PokemonCard';

export default function PokemonScreen({ navigation }: NativeStackScreenProps<StackParams, 'Lista'>) {
  const { colors } = useApp();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    let active = true;
    setLoading(true); setError('');
    Promise.all([1, 4, 7].map(id => fetchPokemon(id, controller.signal)))
      .then(result => { if (active) setPokemon(result); })
      .catch(() => { if (active) setError('Não foi possível carregar. Verifique sua internet e tente novamente.'); })
      .finally(() => { clearTimeout(timeout); if (active) setLoading(false); });
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [attempt]);
  return <View style={{ flex: 1, backgroundColor: colors.background }}>
    {loading ? <View style={{ padding: 32 }}><ActivityIndicator size="large" color={colors.primary} /><Text style={{ color: colors.text, textAlign: 'center', marginTop: 12 }}>Buscando na PokéAPI…</Text></View>
    : error ? <View style={{ padding: 24 }}><Text style={{ color: colors.text }}>{error}</Text><Pressable onPress={() => setAttempt(value => value + 1)} style={{ paddingVertical: 18 }}><Text style={{ color: colors.primary }}>Tentar novamente</Text></Pressable></View>
    : <FlatList data={pokemon} keyExtractor={item => String(item.id)} contentContainerStyle={{ padding: 20 }} ListHeaderComponent={<Text style={{ color: colors.text, fontSize: 26, fontWeight: '800', marginBottom: 20 }}>Escolha seu Pokémon</Text>} renderItem={({ item }) => <PokemonCard pokemon={item} onPress={() => navigation.navigate('Detalhes', { pokemon: item })} />} />}
  </View>;
}
