import React, { useEffect, useState } from 'react'
import style from './App.module.scss'
import { Card, Game } from './Components/GameComponent/GameComponent'
import { initPokemonDetck } from './Utils/functionUtils'

const App: React.FunctionComponent = () => {
  const pokemonArray = initPokemonDetck(4)
  const [isPlayAgain, setIsPlayAgain] = useState(false)
  const [pokemonArraystate, setPokemonArrayState] =
    useState<Card[]>(pokemonArray)

  useEffect(() => {
    const fetchImages = () => {
      const imagePath = process.env.REACT_APP_IMAGE_POKEMON_PATH
      pokemonArray.map((el) => {
        return fetch(`${imagePath}${el.pokemonName}.svg`)
      })
    }
    fetchImages()
  }, [pokemonArray])

  useEffect(() => {
    if (isPlayAgain) {
      const newPokemonArray = initPokemonDetck(4)
      setPokemonArrayState(newPokemonArray)
      setIsPlayAgain(false)
    }
  }, [isPlayAgain, pokemonArraystate])

  return (
    <div className={style.App}>
      <div>
        <h1>Pokemon Memory Game</h1>
      </div>
      <Game pokemonArray={pokemonArraystate} resetGame={setIsPlayAgain} />
    </div>
  )
}

export default App
