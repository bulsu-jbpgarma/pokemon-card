import "./App.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddPokemon from "./pages/PokemonAdd.jsx";
import EditPokemon from "./pages/EditPokemon.jsx";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddPokemon />} />
        <Route path="/edit/:id" element={<EditPokemon />} />
      </Routes>
    </>
  );
}

export default App;
