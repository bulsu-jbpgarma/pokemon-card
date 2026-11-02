import { Skeleton } from "@/components/ui/skeleton";
import PokemonCard from "@/components/PokemonCard";

export default function PokemonList({
  pokemonList,
  isLoading,
  onEdit,
  onDelete,
}) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
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
