import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from '../../app/apiService';
import { POKEMONS_PER_PAGE } from '../../app/config';

export const getPokemons = createAsyncThunk('books/getPokemons', async ({ page, search }, { rejectWithValue }) => {
	try {
		let url = `/pokemons?page=${page}&limit=${POKEMONS_PER_PAGE}`;
		if (search) url += `&q=${search}`;
		const response = await apiService.get(url);
		const timeout = () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve('ok');
				}, 1000);
			});
		};
		await timeout();
		return response.data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const getPokemonById = createAsyncThunk('pokemons/getPokemonById', async (id, { rejectWithValue }) => {
	try {
		let url = `/pokemons/${id}`;
		const response = await apiService.get(url);
		if (!response.data) return rejectWithValue({ message: 'No data' });
		return response.data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const addPokemon = createAsyncThunk('books/addPokemon', async ({ book }, { rejectWithValue }) => {
	try {
		let url = '/favorites';
		await apiService.post(url, book);
		return;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deletePokemon = createAsyncThunk('books/deletePokemon', async ({ id }, { rejectWithValue, dispatch }) => {
	try {
		let url = `/favorites/${id}`;
		await apiService.delete(url);
		// dispatch(getFavorite())
		return;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState: {
		isLoading: false,
		pokemons: [],
		pokemon: {
			pokemon: null,
			nextPokemon: null,
			previousPokemon: null,
		},
		search: '',
		page: 1,
	},
	reducers: {
		changePage: (state, action) => {
			state.page++;
		},
	},
	extraReducers: {
		[getPokemons.pending]: (state, action) => {
			state.loading = true;
			state.errorMessage = '';
		},
		[getPokemonById.pending]: (state) => {
			state.loading = true;
			state.errorMessage = '';
		},

		[addPokemon.pending]: (state) => {
			state.loading = true;
			state.errorMessage = '';
		},
		[deletePokemon.pending]: (state) => {
			state.loading = true;
			state.errorMessage = '';
		},
		[getPokemons.fulfilled]: (state, action) => {
			state.loading = false;
			state.pokemons = [...state.pokemons, ...action.payload];
		},
		[getPokemonById.fulfilled]: (state, action) => {
			console.log('ppaa', action.payload);
			state.loading = false;
			state.pokemon = action.payload;
		},
		[addPokemon.fulfilled]: (state) => {
			state.loading = false;
		},
		[deletePokemon.fulfilled]: (state) => {
			state.loading = false;
		},
		[getPokemons.rejected]: (state, action) => {
			state.loading = false;
			if (action.payload) {
				console.log('rejected', action.payload);
				state.errorMessage = action.payload.message;
			} else {
				state.errorMessage = action.error.message;
			}
		},
		[getPokemonById.rejected]: (state, action) => {
			state.loading = false;
			if (action.payload) {
				console.log('rejected', action.payload);
				state.errorMessage = action.payload.message;
			} else {
				state.errorMessage = action.error.message;
			}
		},

		[addPokemon.rejected]: (state, action) => {
			state.loading = false;
			if (action.payload) {
				state.errorMessage = action.payload.message;
			} else {
				state.errorMessage = action.error.message;
			}
		},
		[deletePokemon.rejected]: (state, action) => {
			state.loading = false;
			if (action.payload) {
				console.log('rejected', action.payload);
				state.errorMessage = action.payload.message;
			} else {
				state.errorMessage = action.error.message;
			}
		},
	},
});

// export default pokemonSlice.reducer;
const { actions, reducer } = pokemonSlice;
export const { changePage } = actions;
console.log(changePage);
export default reducer;
