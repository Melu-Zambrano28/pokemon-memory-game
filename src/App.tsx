import React from 'react'
import style from './App.module.scss'
import { Game } from './Components/GameComponent/GameComponent'
import { getDeck, getFirstNPokemon } from './Utils/functionUtils'

const App: React.FunctionComponent = () => {
  const firstNPokemon = getFirstNPokemon(4)
  const pokemonArray = getDeck(firstNPokemon)
  return (
    <div className={style.App}>
      <div>
        <h1>Pokemon Memory Game</h1>
      </div>
      <Game pokemonArray={pokemonArray} />
    </div>
  )
}

export default App
