import React , { useState, useEffect } from 'react'
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import axios from 'axios'

function App() {
  // Set some global variables - pokemon list, current & previous pages for pagination, loading state, etc.
  const [ pokemon, setPokemon ] = useState([])
  const [ currentPageUrl, setCurrentPageUrl ] = useState('https://pokeapi.co/api/v2/pokemon')
  const [ nextPageUrl, setNextPageUrl ] = useState('https://pokeapi.co/api/v2/pokemon')
  const [ prevPageUrl, setPrevPageUrl ] = useState('https://pokeapi.co/api/v2/pokemon')
  // use loading states for a better user experience. default is set to true.
  const [ loading, setLoading ] = useState(true)


  useEffect(() => {
    // for every request, set loading back to true until request resolves and response received
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      // create a way for old requests to be cancelled if they don't resolve before a new request
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        // when request resolves and response received, loading can be set to false
        setLoading(false)
        // set the new 'next' and 'previous' pages
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        // set the new pokemon list
        setPokemon(res.data.results.map(pokemon => pokemon.name))
      })

      // cancel old requests
      return () => cancel()
    // pass an argument below so that when the currentPageUrl changes, the page reloads by rerunning this axios GET call. If currentPageUrl doesn't change, page doesn't reload.
  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  // use the loading state
  if (loading) return 'Loading...'

  return (
    <React.Fragment>
    <PokemonList pokemon={pokemon} />
    <Pagination
      goToNextPage={nextPageUrl ? goToNextPage : null}
      goToPrevPage={prevPageUrl ? goToPrevPage : null}
    />
    </React.Fragment>
  )
}

export default App
