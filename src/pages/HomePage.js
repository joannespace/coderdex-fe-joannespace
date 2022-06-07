import React, { useEffect, useState } from 'react'
import { PageTitle } from '../components/PageTitile'
import PokeList from '../components/PokeList'
import { SearchBox } from '../components/SearchBox'
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from '../features/pokemons/pokemonSlice';


export const HomePage = () => {
    const { search, page } = useSelector(state => state.pokemons)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemons({ page, search }))
    }, [page, search])
    return (
        <>
            <PageTitle />
            <SearchBox />
            <PokeList />
        </>
    )
}
