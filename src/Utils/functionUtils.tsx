import { Card } from '../App'

const shuffle = (array: string[]) => {
  const arraySorted = array.sort(() => Math.floor(Math.random() - 0.5))
  return arraySorted
}

const getDeck = (baseDeck: string[]): Card[] => {
  const newDeck = baseDeck.concat(baseDeck)
  const deckShuffled = shuffle(newDeck)
  const deckToReturn = deckShuffled.map((card) => {
    return { pokemonName: card, isVisible: false, isMatched: false }
  })
  return deckToReturn
}

const IsGameOver = (allCards: Card[]): boolean => {
  for (const card of allCards) {
    if (!card.isVisible) return false
  }
  return true
}

export { shuffle, getDeck, IsGameOver }