import React, { FunctionComponent } from 'react'
import { Card } from '../../App'
import style from './CardComponent.module.scss'

type CardComponentProps = { card: Card }

const CardComponent: FunctionComponent<CardComponentProps> = ({ card }) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.cardContent}>
        {card.isVisible && <div>{card.pokemonName}</div>}
      </div>
    </div>
  )
}

export { CardComponent }
