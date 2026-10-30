import PokemonCard from "@/components/PokemonCard";

export default function PokemonList({
  pokemonList,
  isLoading,
  onEdit,
  onDelete,
}) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-background p-12 text-center text-sm text-muted-foreground">
        Loading Pokémon...
      </div>
    );
  }

  if (pokemonList.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-background p-12 text-center text-sm text-muted-foreground">
        No Pokémon added yet. Use "Add Pokémon" to create your first card!
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
