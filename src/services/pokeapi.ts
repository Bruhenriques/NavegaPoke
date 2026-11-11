export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string | null; other?: { 'official-artwork'?: { front_default: string | null } } };
};

export async function fetchPokemon(id: number, signal: AbortSignal): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal });
  if (!response.ok) throw new Error('Não foi possível carregar os Pokémon.');
  return response.json();
}
export const imageOf = (pokemon: Pokemon) => pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;
export const nameOf = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);
