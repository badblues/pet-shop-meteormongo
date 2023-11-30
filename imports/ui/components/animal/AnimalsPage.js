import React, { useState } from 'react'
import AnimalsList from './AnimalsList'
import AddAnimal from './AddAnimal'
import AnimalProfile from './AnimalProfile'
import '../../styles/Resource.css'

const AnimalsPage = () => {

  const [selectedAnimal, setSelectedAnimal] = useState(null);

  return (
    <div className='page'>
      <div className='main-container'>
        <AnimalsList onSelect={(animal) => setSelectedAnimal(animal)}/>
        {selectedAnimal ? (
          <AnimalProfile animal={selectedAnimal} onDelete={() => setSelectedAnimal(null)}/>
          ) : null}
      </div>
      <AddAnimal/>
    </div>
  )
}

export default AnimalsPage