import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState()
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://puppies-api-production.up.railway.app/api/puppies')
        const newData = await response.json()
        setData(newData)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchData()
  }, [])

  console.log(data)

  if (data === undefined) return <h1>Loading Main Page...</h1>

  if (error) return <h1>Please look at this error: {error}</h1>

  return (
    <div className='app'>
      <header className='app-header'>hey</header>
    </div>
  )
}

export default App
