import React from 'react'

export default function PokemonList({ pokemon }) {
  return (
    <div>
      {pokemon.map(pokemon => (
        <div key={pokemon}>{pokemon}</div>
      ))}
    </div>
  )
}
