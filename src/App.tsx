import React, { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import FixedBottomNavigation from './components/FixedBottomNavigation'
import TopNav from './components/TopNav'
import Home from './components/Home'
import Add from './components/Add'
import Favorite from './components/Favorite'
import Update from './components/Update'

const App = () => {
  const [data, setData] = useState()
  const [error, setError] = useState<string>()
  const [search, setSearch] = useState(' ')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://puppies-api-production.up.railway.app/api/puppies')
        const newData = await response.json()
        setData(newData)
      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchData()
  }, [])

  if (data === undefined) return <h1>Loading Main Page...</h1>

  if (error) return <h1>Please look at this error: {error}</h1>

  const pullData = (dataa: React.SetStateAction<string>) => {
    setSearch(dataa)
  }

  const pullDataFromBottomNav = (dataa: React.SetStateAction<string>) => {
    setSearch(dataa)
  }

  return (
    <div className='app'>
      <header className='app-header'>
        {/* <TopNav func={pullData} /> */}
        <Routes>
          <Route path='/' element={<Home puppies={data} search={search} />} />
          <Route path='/favorite' element={<Favorite puppies={data} />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update' element={<Update />} />
        </Routes>
        {/* <Puppies puppies={data}/> */}
        <FixedBottomNavigation data={data} func={pullDataFromBottomNav} />
      </header>
    </div>
  )
}

export default App
