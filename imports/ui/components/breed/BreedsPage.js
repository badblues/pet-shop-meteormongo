import React, { useState } from 'react'
import BreedsList from './BreedsList'
import AddBreed from './AddBreed'
import BreedProfile from './BreedProfile'
import '../../styles/Styles.css'

const BreedsPage = () => {

  const [selectedBreed, setSelectedBreed] = useState(null);

  return (
    <div className='page'>
      <div className='main-container'>
        <BreedsList onSelect={(breed) => setSelectedBreed(breed)}/>
        {selectedBreed ? (
          <BreedProfile breed={selectedBreed} onDelete={() => setSelectedBreed(null)}/>
          ) : null}
      </div>
      <AddBreed/>
    </div>
  )
}

export default BreedsPage