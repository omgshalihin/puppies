import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Update'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'

type DataType = {
  puppies: {
    id: string
    name: string
    breed: string
    dob: string
  }[]
  singlePuppy: {
    id: string
    name: string
    breed: string
    dob: string
  }[]
}

export default function DeleteFavButton({ singlePuppy }: DataType) {
  const puppyId = singlePuppy[0].id
  const navigate = useNavigate()

  const deletePuppy = (id: string) => {
    const url = `https://puppies-api-production.up.railway.app/api/puppies/${id}`
    fetch(url, {
      method: 'Delete',
      mode: 'cors',
    })
    window.location.reload()
  }

  const updatePuppy = (single: any) => {
    window.localStorage.setItem('toUpdate', JSON.stringify(single[0]))
    navigate('/update')
  }

  const favoritePuppy = (single: any) => {
    // console.log('favorite');
    // window.localStorage.setItem('toFavorite', JSON.stringify(single[0]));
    const newPup = {
      breed: `${single[0].breed}`,
      name: `${single[0].name}`,
      dob: `${single[0].dob}`,
      favorite: true,
    }
    fetch(`https://puppies-api-production.up.railway.app/api/puppies/${single[0].id}`, {
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

  return (
    <Stack direction='row' spacing={2}>
      <Button variant='outlined' startIcon={<DeleteIcon />} onClick={() => deletePuppy(puppyId)}>
        Delete
      </Button>
      <Button
        variant='contained'
        startIcon={<UpdateIcon />}
        onClick={() => updatePuppy(singlePuppy)}
      >
        Update
      </Button>
      <Button
        variant='contained'
        startIcon={<FavoriteIcon />}
        onClick={() => favoritePuppy(singlePuppy)}
      >
        Favorite
      </Button>
    </Stack>
  )
}
