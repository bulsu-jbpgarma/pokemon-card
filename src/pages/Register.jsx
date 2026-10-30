import React from "react";
import { SignupForm } from "@/components/signup-form";
export default function Register() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <SignupForm className="w-full max-w-sm" />
    </main>
  );
}
