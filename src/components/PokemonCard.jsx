import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function PokemonCard({ pokemon, onEdit, onDelete }) {
  return (
    <Card className="h-full gap-0">
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold">{pokemon.name}</h2>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            {pokemon.type}
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x rounded-lg border border-border bg-muted/40 py-3 text-center">
          <div>
            <p className="text-xs font-medium text-muted-foreground">HP</p>
            <p className="mt-1 font-semibold">{pokemon.hp}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">ATK</p>
            <p className="mt-1 font-semibold">{pokemon.attack}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">DEF</p>
            <p className="mt-1 font-semibold">{pokemon.defense}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {pokemon.description}
        </p>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button variant="outline" onClick={() => onEdit(pokemon)}>
          <Pencil />
          Edit
        </Button>
        <Button
          variant="outline"
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(pokemon.id, pokemon.name)}
        >
          <Trash2 />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
