import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import PokemonForm from "@/components/PokemonForm";
import { getPokemon, updatePokemon } from "../services/pokemon.services.js";

export default function EditPokemon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = getPokemon((data) => {
      setPokemon(data.find((item) => item.id === id) ?? null);
      setIsLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [id]);

  const handleUpdate = async (values) => {
    setIsSubmitting(true);
    const result = await updatePokemon(
      id,
      values.name,
      values.type,
      values.hp,
      values.attack,
      values.defense,
      values.description,
    );
    setIsSubmitting(false);

    if (result.success) {
      toast.success(result.message || "Pokémon updated successfully!");
      navigate("/home");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <Navbar />

      <main className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
        <div className="space-y-3">
          <Link
            to="/home"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Back to collection
          </Link>
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight">Edit Pokémon</h1>
            <p className="text-muted-foreground">
              Update the details of this Pokémon.
            </p>
          </div>
        </div>

        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading Pokémon...</p>
        )}

        {!isLoading && !pokemon && (
          <p className="text-sm text-muted-foreground">
            Pokémon not found. It may have been deleted.
          </p>
        )}

        {pokemon && (
          <PokemonForm
            initialValues={{
              name: pokemon.name,
              type: pokemon.type,
              hp: pokemon.hp,
              attack: pokemon.attack,
              defense: pokemon.defense,
              description: pokemon.description,
            }}
            onSubmit={handleUpdate}
            onCancel={() => navigate("/home")}
            submitLabel="Update Pokémon"
            loadingLabel="Updating..."
            isSubmitting={isSubmitting}
          />
        )}
      </main>
    </div>
  );
}
