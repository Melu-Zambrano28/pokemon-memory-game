import React, { useState } from 'react'
import './App.css'
import { CardComponent } from './Components/CardComponent/CardComponent'
import { getDeck, IsGameOver } from './Utils/functionUtils'

export type Card = {
  pokemonName: string
  isVisible: boolean
  isMatched: boolean
}

type CardWithIndex = Card & {
  cardIndex: number
}

function App() {
  const [allCards, setAllCards] = useState<Card[]>([])
  const [victoryState, setVictoryState] = useState(false)
  const [cardToCheck, setCardToCheck] = useState<CardWithIndex | null>(null)

  React.useEffect(() => {
    const deck = getDeck(['1', '2', '3', '4'])
    setAllCards(deck)
  }, [])

  React.useEffect(() => {
    if (IsGameOver(allCards)) {
      setVictoryState(victoryState)
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

  const checkIfCardsMatched = (currentCard: Card, currentCardIndex: number) => {
    toggleCard(currentCardIndex)

    if (cardToCheck === null) {
      setCardToCheck({ ...currentCard, cardIndex: currentCardIndex })
      return
    }

    if (cardToCheck.cardIndex === currentCardIndex) {
      return
    }

    if (cardToCheck.pokemonName !== currentCard.pokemonName) {
      const storedCardIndex = cardToCheck.cardIndex
      toggleCard(storedCardIndex)
      toggleCard(currentCardIndex)
      setCardToCheck(null)
    } else {
      setCardToCheck(null)
    }
  }

  return (
    <div>
      <div className="App">
        <div className="deck">
          {victoryState && <div>Hai vinto!</div>}
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

export default App
