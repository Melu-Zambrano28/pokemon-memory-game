import React, { useEffect, useState } from 'react'
import { IsGameOver } from '../../Utils/functionUtils'
import { CardComponent } from '../CardComponent/CardComponent'
import style from './GameComponent.module.scss'

export type Card = {
  pokemonName: string
  isVisible: boolean
  isMatched: boolean
}

type CardWithIndex = Card & {
  cardIndex: number
}

type GameProps = {
  pokemonArray: Card[]
}

const Game: React.FunctionComponent<GameProps> = ({ pokemonArray }) => {
  const [allCards, setAllCards] = useState<Card[]>(pokemonArray)
  const [victoryState, setVictoryState] = useState(false)
  const [cardToCheck, setCardToCheck] = useState<CardWithIndex | null>(null)
  const [isClicked, setIsClicked] = useState(false)
  const [score, setScore] = useState(0)

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
    if (IsGameOver(allCards)) {
      setVictoryState(true)
    }
  }, [allCards, victoryState])

  const toggleCard = (index: number) => {
    setAllCards((prevState) => {
      const localState = [...prevState]
      const currentCard = localState[index]
      const newCard: Card = {
        ...currentCard,
        isVisible: !currentCard.isVisible,
      }
      localState[index] = newCard
      return localState
    })
  }

  const setMatch = (first: number, second: number) =>
    setAllCards((prevCardState) => {
      return prevCardState.map((card, index) => {
        if (index === first || index === second) {
          return {
            ...card,
            isMatched: true,
          }
        }
        return card
      })
    })

  const incrementScore = () => {
    setScore(score + 5)
  }

  const decrementScore = () => {
    if (score < 1) {
      setScore(0)
      return
    }
    setScore(score - 1)
  }

  const checkIfCardsMatched = (currentCard: Card, currentCardIndex: number) => {
    if (allCards[currentCardIndex].isMatched) return

    if (isClicked) return

    toggleCard(currentCardIndex)

    if (cardToCheck === null) {
      setCardToCheck({ ...currentCard, cardIndex: currentCardIndex })
      return
    }

    if (cardToCheck.cardIndex === currentCardIndex) {
      return
    }

    setIsClicked(true)

    setTimeout(() => {
      if (cardToCheck.pokemonName !== currentCard.pokemonName) {
        const storedCardIndex = cardToCheck.cardIndex
        toggleCard(storedCardIndex)
        toggleCard(currentCardIndex)
        setCardToCheck(null)
        decrementScore()
      } else {
        setCardToCheck(null)
        setMatch(cardToCheck.cardIndex, currentCardIndex)
        incrementScore()
      }

      setIsClicked(false)
      console.log(`Now you can click it`)
    }, 300)
  }

  return (
    <div>
      <div className={style.game}>
        <div className={style.gameInfo}>
          {victoryState && (
            <div className={style.gameInfoForItems}>You win!</div>
          )}
          <div className={style.gameInfoForItems}>Score: {score}</div>
        </div>
        <div className={style.deck}>
          {allCards.map((card, indexCard) => {
            return (
              <div
                key={indexCard}
                className="card"
                onClick={() => checkIfCardsMatched(card, indexCard)}
              >
                <CardComponent card={card} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { Game }
