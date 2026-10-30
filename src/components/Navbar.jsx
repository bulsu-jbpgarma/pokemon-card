import { NavLink, useNavigate } from "react-router-dom";
import { CircleDot, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { logoutUser } from "../services/pokemon.services.js";

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-muted text-foreground"
      : "text-muted-foreground hover:text-foreground"
  }`;

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <NavLink to="/home" className="flex items-center gap-2 font-bold">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <CircleDot className="size-4" />
            </span>
            <span className="hidden sm:inline">Pokédex</span>
          </NavLink>

          <nav className="flex items-center gap-1">
            <NavLink to="/home" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/add" className={linkClass}>
              Add Pokémon
            </NavLink>
          </nav>
        </div>

        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}
