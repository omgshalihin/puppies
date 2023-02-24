/* eslint-disable max-len */
import React from 'react'
import './Favorite.css'

const Favorite = ({ puppies }: any) => {
  const onlyFavPuppies = puppies.filter((el: any) => el.favorite === 'true')

  return (
    <>
      <h1 className='header'>My Favorite Puppies</h1>
      <div className='fav-content'>
        {onlyFavPuppies.map(
          (el: {
            name:
              | string
              | number
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined
            dob:
              | string
              | number
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined
            breed:
              | string
              | number
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined
          }) => (
            <>
              <p>
                {el.name} is a {el.breed} breed and born on the {el.dob}.
              </p>
            </>
          ),
        )}
      </div>
    </>
  )
}

export default Favorite
