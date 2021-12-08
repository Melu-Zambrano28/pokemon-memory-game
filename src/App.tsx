import React, { useEffect, useState } from 'react'
import style from './App.module.scss'
import { Card, Game } from './Components/GameComponent/GameComponent'
import { getDeckFromResponse, getFirstNPokemon } from './Utils/functionUtils'

export type PokeApiResponse = {
  id: number
  name: string
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
}

const fetchPokemon = async (idPokemon: string): Promise<PokeApiResponse> => {
  const imagePath = process.env.REACT_APP_IMAGE_POKEMON_PATH
  const response = await fetch(`${imagePath}${idPokemon}`)
  return response.json()
}

const Loading: React.FunctionComponent = () => {
  useEffect(() => {
    console.log('mi sono montato')

    return () => console.log('mi sono smontato ciao ciao')
  }, [])

  return <div>Loading...</div>
}

const App: React.FunctionComponent = () => {
  const [isPlayAgain, setIsPlayAgain] = useState(false)
  const [pokemonArraystate, setPokemonArrayState] = useState<Card[]>([])
  const [loadingApi, setLoadingApi] = useState(false)
  const [errorApi, setErrorApi] = useState<Error | null>(null)
  const [responseApi, setResponseApi] = useState<PokeApiResponse[]>([])

  // useEffect(() => {
  //   const fetchImages = () => {
  //     const imagePath = process.env.REACT_APP_IMAGE_POKEMON_PATH
  //     pokemonArray.map((el) => {
  //       return fetch(`${imagePath}${el.pokemonName}.svg`)
  //     })
  //   }
  //   fetchImages()
  // }, [pokemonArray])

  const fetchPokemonAndCreateDeck = async () => {
    try {
      setLoadingApi(true)
      const pokemonArray = getFirstNPokemon(4)
      const pokemonFromApi = pokemonArray.map(async (pokemonIndex) => {
        const pokemon = await fetchPokemon(pokemonIndex)

        return pokemon
      })

      const pokemonResult = await Promise.all(pokemonFromApi)
      setResponseApi(pokemonResult)

      const arrayOfPokeCard = getDeckFromResponse(pokemonResult)

      console.log('this is an array of pokemon card ', arrayOfPokeCard)
      setPokemonArrayState(arrayOfPokeCard)
    } catch (error) {
      setErrorApi(new Error(`this is an Error :O )`))
    } finally {
      setLoadingApi(false)
    }
  }

  useEffect(() => {
    fetchPokemonAndCreateDeck()
  }, [])

  useEffect(() => {
    if (isPlayAgain) {
      fetchPokemonAndCreateDeck()
      setIsPlayAgain(false)
    }
  }, [isPlayAgain])

  return (
    <div className={style.App}>
      <div>
        <h1>Pokemon Memory Game</h1>
      </div>

      {loadingApi && <Loading />}

      {!loadingApi && (
        <Game pokemonArray={pokemonArraystate} resetGame={setIsPlayAgain} />
      )}
    </div>
  )
}

export default App
