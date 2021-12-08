import React, { useEffect, useState } from 'react'
import style from './App.module.scss'
import { Card, Game } from './Components/GameComponent/GameComponent'
import { Loading } from './Components/LoadingComponent/LoadingComponent'
import { getDeck, getFirstNPokemon } from './Utils/functionUtils'

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

const App: React.FunctionComponent = () => {
  const [playAgain, setPlayAgain] = useState(false)
  const [pokemonArraystate, setPokemonArrayState] = useState<Card[]>([])
  const [loadingApi, setLoadingApi] = useState(false)
  const [errorApi, setErrorApi] = useState<Error | null>(null)

  const fetchPokemonAndCreateDeck = async () => {
    try {
      setLoadingApi(true)
      const pokemonArray = getFirstNPokemon(4)
      const pokemonFromApi = pokemonArray.map(async (pokemonIndex) => {
        const pokemon = await fetchPokemon(pokemonIndex)

        return pokemon
      })

      const pokemonResult = await Promise.all(pokemonFromApi)
      const arrayOfPokeCard = getDeck(pokemonResult)
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
    const fetchImages = () => {
      pokemonArraystate.map((el) => {
        console.log('Fetching image ...')
        return fetch(el.srcImage)
      })
    }
    fetchImages()
  }, [pokemonArraystate])

  useEffect(() => {
    if (playAgain) {
      fetchPokemonAndCreateDeck()
      setPlayAgain(false)
    }
  }, [playAgain])

  return (
    <div className={style.App}>
      <div>
        <h1>Pokemon Memory Game</h1>
      </div>

      {loadingApi && <Loading />}

      {!loadingApi && (
        <Game pokemonArray={pokemonArraystate} resetGame={setPlayAgain} />
      )}
    </div>
  )
}

export default App
