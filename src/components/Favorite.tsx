/* eslint-disable max-len */
import React from 'react'

const Favorite = ({ puppies }: any) => {
  const onlyFavPuppies = puppies.filter((el: any) => el.favorite === 'true')

  return (
    <>
      <h1>My Favorite Puppies</h1>
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
    </>
  )
}

export default Favorite
