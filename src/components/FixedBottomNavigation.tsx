import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Paper from '@mui/material/Paper'
import './FixedBottomNavigation.css'
import { useNavigate } from 'react-router-dom'
// import Puppies from './Puppies';

// type DataType = {
//   puppies: {
//     id: string,
//     name: string,
//     breed: string,
//     dob: string,
//   }[]
// };

export default function FixedBottomNavigation({ data, func }: any) {
  const [value, setValue] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const clickHomeHandler = (dataa: any) => {
    func(dataa)
    navigate('/')
  }

  const clickFavoriteHandler = () => {
    navigate('/favorite')
  }

  const clickAddHandler = () => {
    navigate('/add')
  }

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      {/* <Puppies puppies={puppies}/> */}
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            label='Home'
            icon={<HomeIcon />}
            onClick={() => clickHomeHandler(data)}
          />
          <BottomNavigationAction
            label='Favorites'
            icon={<FavoriteIcon />}
            onClick={clickFavoriteHandler}
          />
          <BottomNavigationAction label='Add' icon={<AddCircleIcon />} onClick={clickAddHandler} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
