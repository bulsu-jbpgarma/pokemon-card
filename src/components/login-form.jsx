import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "cn";
import { auth } from "@/lib/firebase";
import { loginUser, loginWithGoogle } from "@/services/pokemon.services";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GalleryVerticalEndIcon } from "lucide-react";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(email, password);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(
        err.code === "auth/invalid-credential"
          ? "Incorrect email or password."
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home", { replace: true });
      }
    });

    return unsubscribe;
  }, [navigate]);

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-6" />
            </div>

            <h1 className="text-xl font-bold">Welcome to Pokédex</h1>

            <FieldDescription>
              Sign in to manage your Pokémon collection.
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </Button>
          </Field>

          <FieldSeparator>Or continue with</FieldSeparator>

          <Field>
            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Continue with Google
            </Button>
          </Field>

          <FieldDescription className="text-center">
            Don&apos;t have an account?
            <a href="/register" className="font-medium underline">
              Sign up
            </a>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
