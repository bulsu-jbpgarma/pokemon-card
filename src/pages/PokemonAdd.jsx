import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import PokemonForm from "@/components/PokemonForm";
import { addPokemon } from "../services/pokemon.services.js";

export default function AddPokemon() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async (values) => {
    setIsSubmitting(true);
    const result = await addPokemon(
      values.name,
      values.type,
      values.hp,
      values.attack,
      values.defense,
      values.description,
    );
    setIsSubmitting(false);

    if (result.success) {
      toast.success(result.message || "Pokémon added successfully!");
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
            <h1 className="text-3xl font-bold tracking-tight">Add Pokémon</h1>
            <p className="text-muted-foreground">
              Fill in the details below to add a new Pokémon to your collection.
            </p>
          </div>
        </div>

        <PokemonForm
          onSubmit={handleAdd}
          onCancel={() => navigate("/home")}
          submitLabel="Add Pokémon"
          loadingLabel="Adding..."
          isSubmitting={isSubmitting}
        />
      </main>
    </div>
  );
}
