import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emptyForm = {
  name: "",
  type: "",
  hp: "",
  attack: "",
  defense: "",
  description: "",
};

const isWholeNumber = (value) =>
  value !== "" && Number.isInteger(Number(value));

// Rules match your services file: HP at least 1, Attack/Defense not negative
const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.type.trim()) errors.type = "Type is required.";
  if (!isWholeNumber(values.hp) || Number(values.hp) < 1)
    errors.hp = "HP must be a whole number, at least 1.";
  if (!isWholeNumber(values.attack) || Number(values.attack) < 0)
    errors.attack = "Attack must be a whole number, 0 or more.";
  if (!isWholeNumber(values.defense) || Number(values.defense) < 0)
    errors.defense = "Defense must be a whole number, 0 or more.";
  if (!values.description.trim())
    errors.description = "Description is required.";
  return errors;
};

function FormField({ id, label, error, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export default function PokemonForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  loadingLabel,
  isSubmitting,
}) {
  const [values, setValues] = useState(initialValues ?? emptyForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    await onSubmit(values);
  };

  return (
    <Card className="shadow-none">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <FormField id="name" label="Pokémon name" error={errors.name}>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Pikachu"
              value={values.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
            />
          </FormField>

          <FormField id="type" label="Type" error={errors.type}>
            <Input
              id="type"
              name="type"
              placeholder="e.g. Electric"
              value={values.type}
              onChange={handleChange}
              aria-invalid={!!errors.type}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-3">
            <FormField id="hp" label="HP" error={errors.hp}>
              <Input
                id="hp"
                name="hp"
                type="number"
                placeholder="100"
                value={values.hp}
                onChange={handleChange}
                aria-invalid={!!errors.hp}
              />
            </FormField>
            <FormField id="attack" label="Attack" error={errors.attack}>
              <Input
                id="attack"
                name="attack"
                type="number"
                placeholder="55"
                value={values.attack}
                onChange={handleChange}
                aria-invalid={!!errors.attack}
              />
            </FormField>
            <FormField id="defense" label="Defense" error={errors.defense}>
              <Input
                id="defense"
                name="defense"
                type="number"
                placeholder="40"
                value={values.defense}
                onChange={handleChange}
                aria-invalid={!!errors.defense}
              />
            </FormField>
          </div>

          <FormField
            id="description"
            label="Description"
            error={errors.description}
          >
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe your Pokémon..."
              value={values.description}
              onChange={handleChange}
              aria-invalid={!!errors.description}
              className="flex min-h-24 w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
            />
          </FormField>

          <div className="flex flex-wrap justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? loadingLabel : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
