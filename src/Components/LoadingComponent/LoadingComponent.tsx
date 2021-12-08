import React, { useEffect } from 'react'

const Loading: React.FunctionComponent = () => {
  useEffect(() => {
    console.log('mi sono montato')

    return () => console.log('mi sono smontato ciao ciao')
  }, [])

  return <div>Loading...</div>
}

export { Loading }
