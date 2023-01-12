import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import './Add.css'

export default function Update() {
  const navigate = useNavigate()
  const newObject: any = window.localStorage.getItem('toUpdate')
  const puppyId: string = JSON.parse(newObject).id
  const [newPuppy, setNewPuppy] = useState({
    breed: `${JSON.parse(newObject).breed}`,
    name: `${JSON.parse(newObject).name}`,
    dob: `${JSON.parse(newObject).dob}`,
  })

  const addPuppy = (newPup: { breed: string; name: string; dob: string }) => {
    fetch(`https://puppies-api-production.up.railway.app/api/puppies/${puppyId}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(newPup),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(() => {
      navigate('/')
      setTimeout(() => {
        window.location.reload()
      }, 200)
    })
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setNewPuppy({ ...newPuppy, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    addPuppy(newPuppy)
    // console.log(newPuppy);
    // console.log(puppyId);
  }

  return (
    <>
      <h1>update</h1>
      <Box
        className='try'
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          sx={{
            '& > :not(style)': { color: 'white' },
          }}
          id='outlined-basic'
          label='Name of Puppy'
          variant='outlined'
          value={newPuppy.name}
          name='name'
          onChange={handleChange}
        />
        <TextField
          sx={{
            '& > :not(style)': { color: 'white' },
          }}
          id='outlined-basic'
          label='Breed'
          variant='outlined'
          value={newPuppy.breed}
          name='breed'
          onChange={handleChange}
        />
        <TextField
          sx={{
            '& > :not(style)': { color: 'white' },
          }}
          id='outlined-basic'
          label='yyyy-mm-dd'
          variant='outlined'
          value={newPuppy.dob}
          name='dob'
          onChange={handleChange}
        />
        <Button type='submit' variant='contained' endIcon={<SendIcon />}>
          Submit
        </Button>
      </Box>
    </>
  )
}
