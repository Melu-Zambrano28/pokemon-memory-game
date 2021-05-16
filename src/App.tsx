import React from 'react'
import style from './App.module.scss'
import { Game } from './Components/GameComponent/GameComponent'
import { getDeck } from './Utils/functionUtils'

const App: React.FunctionComponent = () => {
  const pokemonArray = getDeck(
    Array(4)
      .fill('')
      .map((el) => Math.floor(Math.random() * 151 + 1).toString())
  )
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
