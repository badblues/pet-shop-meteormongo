import React, { useState } from 'react'
// import AnimalsList from './AnimalsList'
// import AddAnimal from './AddAnimal'
// import AnimalProfile from './AnimalProfile'
import '../../styles/Resource.css'

const AnimalsPage = () => {

  const [selectedAnimal, setSelectedAnimal] = useState(null);

  return (
    <div className='page'>
      {/* <div className='main-container'>
        <AnimalsList onSelect={(Animal) => setSelectedAnimal(Animal)}/>
        {selectedAnimal ? (
          <AnimalProfile Animal={selectedAnimal} onDelete={() => setSelectedAnimal(null)}/>
          ) : null}
      </div>
      <AddAnimal/> */}
    </div>
  )
}

export default AnimalsPage