/* eslint-disable max-len */
import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
// import { useNavigate } from 'react-router-dom';
import './Home.css'
import DeleteFavButton from './DeleteFavButton'

export default function Home({ puppies, search }: any) {
  const [res, setRes] = React.useState<any[]>()
  const [singlePuppy, setSinglePuppy] = React.useState<any[]>()
  const [length, setLength] = React.useState<number>()
  const ref = React.useRef<HTMLDivElement>(null)
  const date = new Date()
  let d2 = date.getDate()
  let m2 = 1 + date.getMonth()
  let y2 = date.getFullYear()
  const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  const viewPuppyHandler = (id: string) => {
    setSinglePuppy(puppies.filter((item: { id: string }) => item.id === id))
    setLength(1)
  }

  React.useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&per_page=50&query=dog&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      )
      const newImage = await response.json()
      const result = newImage.results
      setRes(result)
      setSinglePuppy(puppies)
      setLength(puppies.length)

      if (search !== ' ') {
        setSinglePuppy(
          puppies.filter(
            (p: { breed: string; name: string }) =>
              p.breed.toLowerCase() === search ||
              p.name.toLowerCase() === search ||
              p.name === search ||
              p.breed === search,
          ),
        )
        if (search === '') {
          setSinglePuppy(puppies)
        }
      }
    }
    fetchImage()
  }, [search, puppies])

  if (res === undefined) return <h1>Loading Dog Pictures...</h1>
  if (singlePuppy === undefined) {
    return <h1>Loading the puppy of your choice...</h1>
  }

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <h1 className='header'>Adopt a Puppy</h1>
      <CssBaseline />
      <List>
        {singlePuppy.map((puppy, index) => {
          const { dob } = puppy
          const d1 = dob.split('-')[2]
          const m1 = dob.split('-')[1]
          const y1 = dob.split('-')[0]
          if (parseInt(d1, 10) > d2) {
            d2 += month[m2 - 1]
            m2 -= 1
          }
          if (parseInt(m1, 10) > m2) {
            m2 += 12
            y2 -= 1
          }
          const d = d2 - parseInt(d1, 10)
          const m = m2 - parseInt(m1, 10)
          const y = y2 - parseInt(y1, 10)

          return (
            <div key={index}>
              <ListItemButton
                className='list--container'
                onClick={() => viewPuppyHandler(puppy.id)}
              >
                <ListItemAvatar>
                  <Avatar alt='Profile Picture' src={res[index].urls.small} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${puppy.name} is a ${puppy.breed}`}
                  secondary={`Age : ${y} years ${m} months ${d} days old`}
                />
              </ListItemButton>
              {length === 1 ? <DeleteFavButton singlePuppy={singlePuppy} puppies={[]} /> : null}
            </div>
          )
        })}
      </List>
    </Box>
  )
}
