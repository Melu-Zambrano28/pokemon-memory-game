import { Card } from '../Components/GameComponent/GameComponent'
import { PokeApiResponse } from '../App'

const shuffle = (array: string[]) => {
  const arraySorted = array.sort(() => Math.floor(Math.random() - 0.5))
  return arraySorted
}

const shuffleArray = (array: PokeApiResponse[]) => {
  const arraySorted = array.sort(() => Math.floor(Math.random() - 0.5))
  return arraySorted
}

const IsGameOver = (allCards: Card[]): boolean => {
  for (const card of allCards) {
    if (!card.isVisible) return false
  }
  return true
}

const getFirstNPokemon = (numberOfPokemon: number): string[] => {
  const arrayWithElement: string[] = Array(numberOfPokemon)
    .fill('')
    .map((el) => Math.floor(Math.random() * 151 + 1).toString())

  return arrayWithElement
}

const getDeck = (baseDeck: PokeApiResponse[]): Card[] => {
  const newDeck = baseDeck.concat(baseDeck)
  const deckShuffled = shuffleArray(newDeck)
  const deckToReturn: Card[] = deckShuffled.map((card) => {
    return {
      pokemonId: card.id,
      pokemonName: card.name,
      isVisible: false,
      isMatched: false,
      srcImage: card.sprites.other.dream_world.front_default,
    }
  })
  return deckToReturn
}

export { shuffle, IsGameOver, getFirstNPokemon, getDeck }
