import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
export default function SettingsScreen() {
  const { colors, isDark, setIsDark } = useApp();
  return <View style={{ flex: 1, backgroundColor: colors.background, padding: 24 }}><View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><Text style={{ color: colors.text, fontSize: 18 }}>Tema escuro</Text><Switch accessibilityLabel="Ativar tema escuro" value={isDark} onValueChange={setIsDark} /></View><Text style={{ color: colors.muted, marginTop: 20 }}>Favoritos e tema ficam guardados durante esta sessão do aplicativo.</Text></View>;
}
