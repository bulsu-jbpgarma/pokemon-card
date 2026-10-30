import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PokemonList from "@/components/PokemonList";
import { getPokemon, deletePokemon } from "../services/pokemon.services.js";

export default function Home() {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getPokemon((data) => {
      setPokemonList(data);
      setIsLoading(false);
    });

    // Stops listening to Firebase when leaving this page
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleEdit = (pokemon) => {
    navigate(`/edit/${pokemon.id}`);
  };

  const handleDelete = (id, name) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="text-sm">
            Are you sure you want to delete <strong>{name}</strong>?
          </span>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={async () => {
                toast.dismiss(t.id);
                const result = await deletePokemon(id);
                if (result.success) {
                  toast.success(
                    result.message || "Pokémon card was deleted successfully!",
                  );
                } else {
                  toast.error(result.message);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <Navbar />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight">
              Pokémon Collection
            </h1>
            <p className="text-muted-foreground">
              Browse, edit, and manage every Pokémon saved in your database.
            </p>
          </div>
          <Button onClick={() => navigate("/add")}>
            <Plus />
            Add Pokémon
          </Button>
        </div>

        {!isLoading && (
          <p className="text-sm text-muted-foreground">
            {pokemonList.length} Pokémon
          </p>
        )}

        <PokemonList
          pokemonList={pokemonList}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
