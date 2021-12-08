import React, { FunctionComponent } from 'react'
import { Card } from '../GameComponent/GameComponent'
import style from './CardComponent.module.scss'

type CardComponentProps = {
  card: Card
  cardIndex: number
  turnCard: (currentCard: Card, currentCardIndex: number) => void
}

const CardComponent: FunctionComponent<CardComponentProps> = ({
  card,
  cardIndex,
  turnCard,
}) => {
  return (
    <div
      className={`${style.cardContainer} ${
        card.isMatched ? style.cardMatched : style.CardbackgroundColor
      }`}
      onClick={() => turnCard(card, cardIndex)}
    >
      <div className={style.cardContent}>
        {card.isVisible && (
          <img
            className={style.pokemon}
            alt={`${card.pokemonName}`}
            src={`${card.srcImage}`}
          ></img>
        )}
      </div>
    </div>
  )
}

export { CardComponent }
