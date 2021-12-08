import React, { useEffect, useState } from 'react'
import style from './App.module.scss'
import { Card, Game } from './Components/GameComponent/GameComponent'
import { initPokemonDeck } from './Utils/functionUtils'

type PokeApiResponse = {
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
  const pokemonArray = React.useMemo(() => initPokemonDeck(4), []) //una sola volta per render, stesso [] === []
  const [isPlayAgain, setIsPlayAgain] = useState(false)
  const [pokemonArraystate, setPokemonArrayState] =
    useState<Card[]>(pokemonArray)
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

  useEffect(() => {
    const getResponse = async () => {
      try {
        setLoadingApi(true)
        const pokemonFromApi = pokemonArray.map(async ({ pokemonName }) => {
          const pokemon = await fetchPokemon(pokemonName)

          return pokemon
        })

        const pokemonResult = await Promise.all(pokemonFromApi)
        setResponseApi(pokemonResult)
      } catch (error) {
        setErrorApi(new Error(`this is an Error :O )`))
      } finally {
        setLoadingApi(false)
      }
    }

    getResponse()
  }, [pokemonArray])

  useEffect(() => {
    if (isPlayAgain) {
      const newPokemonArray = initPokemonDeck(4)
      setPokemonArrayState(newPokemonArray)
      setIsPlayAgain(false)
    }
  }, [isPlayAgain, pokemonArraystate])

  return (
    <div className={style.App}>
      <div>
        <h1>Pokemon Memory Game</h1>
      </div>

      {loadingApi && <div>loading Game...</div>}

      {!loadingApi && (
        <Game pokemonArray={pokemonArraystate} resetGame={setIsPlayAgain} />
      )}
    </div>
  )
}

export default App
