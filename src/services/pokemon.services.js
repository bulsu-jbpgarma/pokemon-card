import {
  ref,
  push,
  onValue,
  update,
  remove,
  get,
  query,
  orderByChild,
  equalTo,
  limitToFirst,
} from "firebase/database";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../lib/firebase.js";
import { db } from "../lib/firebase.js";

const pokemonReference = ref(db, "pokemon");

// Firebase Authentication

const googleProvider = new GoogleAuthProvider();

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};

const isPokemonEmpty = (...fields) => {
  return fields.some(
    (field) =>
      field === undefined || field === null || String(field).trim() === "",
  );
};

export const addPokemon = async (
  name,
  type,
  hp,
  attack,
  defense,
  description,
) => {
  try {
    const isInputEmpty = isPokemonEmpty(
      name,
      type,
      hp,
      attack,
      defense,
      description,
    );

    if (isInputEmpty) {
      return {
        success: false,
        message: "Pokemon fields cannot be empty",
      };
    }

    if (Number(hp) < 1 || Number(attack) < 0 || Number(defense) < 0) {
      return {
        success: false,
        message: "Stats (HP, Attack, Defense) cannot be negative or zero HP!",
      };
    }

    const pokemonQuery = query(
      pokemonReference,
      orderByChild("name"),
      equalTo(name.trim()),
      limitToFirst(1),
    );
    const snapshot = await get(pokemonQuery);

    if (snapshot.exists()) {
      return {
        success: false,
        message: `Pokémon with name "${name}" already exists!`,
      };
    }

    const newPokemon = await push(pokemonReference, {
      name: name.trim(),
      type: type.trim(),
      hp: Number(hp),
      attack: Number(attack),
      defense: Number(defense),
      description: description.trim(),
    });

    return {
      success: true,
      message: "Pokemon added successfully",
      data: newPokemon,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getPokemon = (callback) => {
  try {
    onValue(pokemonReference, (snapshot) => {
      const pokemonArray = [];
      snapshot.forEach((snap) => {
        const pokemonData = snap.val();
        const id = snap.key;
        const pokemonWithId = { id, ...pokemonData };
        pokemonArray.push(pokemonWithId);
      });
      callback(pokemonArray);
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePokemon = async (
  id,
  name,
  type,
  hp,
  attack,
  defense,
  description,
) => {
  try {
    const isInputEmpty = isPokemonEmpty(
      name,
      type,
      hp,
      attack,
      defense,
      description,
    );

    if (isInputEmpty) {
      return {
        success: false,
        message: "Pokemon fields cannot be empty",
      };
    }

    if (Number(hp) < 1 || Number(attack) < 0 || Number(defense) < 0) {
      return {
        success: false,
        message: "Stats (HP, Attack, Defense) cannot be negative or zero HP!",
      };
    }

    const updateReference = ref(db, `pokemon/${id}`);
    await update(updateReference, {
      name: name.trim(),
      type: type.trim(),
      hp: Number(hp),
      attack: Number(attack),
      defense: Number(defense),
      description: description.trim(),
    });

    return {
      success: true,
      message: "Pokemon updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deletePokemon = async (id) => {
  try {
    const deleteReference = ref(db, `pokemon/${id}`);
    await remove(deleteReference);
    return {
      success: true,
      message: "Pokemon deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
