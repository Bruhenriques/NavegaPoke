import React, { createContext, useContext, useState } from 'react';
import { Pokemon } from '../services/pokeapi';

const light = { background: '#f2f5fa', card: '#ffffff', text: '#142338', muted: '#526078', primary: '#b52b39', border: '#dce2eb' };
const dark = { background: '#101722', card: '#1d2939', text: '#f4f6fb', muted: '#b1bfd1', primary: '#ff8792', border: '#354459' };
type State = { isDark: boolean; setIsDark: (value: boolean) => void; colors: typeof light; favorites: Pokemon[]; toggleFavorite: (pokemon: Pokemon) => void };
const AppContext = createContext<State | undefined>(undefined);
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  function toggleFavorite(pokemon: Pokemon) {
    setFavorites(previous => previous.some(item => item.id === pokemon.id)
      ? previous.filter(item => item.id !== pokemon.id) : [...previous, pokemon]);
  }
  return <AppContext.Provider value={{ isDark, setIsDark, colors: isDark ? dark : light, favorites, toggleFavorite }}>{children}</AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('Use dentro de AppProvider');
  return context;
}
