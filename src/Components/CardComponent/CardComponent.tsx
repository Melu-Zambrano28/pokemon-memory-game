import React, { FunctionComponent } from 'react'
import { Card } from '../GameComponent/GameComponent'
import style from './CardComponent.module.scss'

type CardComponentProps = { card: Card }

const CardComponent: FunctionComponent<CardComponentProps> = ({ card }) => {
  const imagePath = process.env.REACT_APP_IMAGE_POKEMON_PATH
  return (
    <div
      className={`${style.cardContainer} ${
        card.isMatched ? style.cardMatched : style.CardbackgroundColor
      }`}
    >
      <div className={style.cardContent}>
        {card.isVisible && (
          <img
            className={style.pokemon}
            alt={`${card.pokemonName}`}
            src={`${imagePath}${card.pokemonName}.svg`}
          ></img>
        )}
      </div>
    </div>
  )
}

export { CardComponent }
