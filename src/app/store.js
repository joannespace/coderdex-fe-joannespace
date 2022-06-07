import { configureStore } from "@reduxjs/toolkit";
import pokemonReducers from "../features/pokemons/pokemonSlice";
// import pokemonReducer from "../features/pokemons/pokemonSlice"

// console.log(pokemonReducer)
const store = configureStore({
    reducer: {
        pokemons: pokemonReducers
    }
});

export default store;