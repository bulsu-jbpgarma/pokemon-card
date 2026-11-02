import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase.js";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setChecking(false);
      if (!user) {
        navigate("/", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return auth.currentUser ? children : null;
}