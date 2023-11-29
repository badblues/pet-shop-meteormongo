import React, { useState } from 'react'
import EditBreed from './UpdateBreed';

const BreedProfile = ({ breed, onDelete }) => {

  const [selectedBreed, setSelectedBreed] = useState(breed);

  const handleDelete = () => {
    Meteor.call('breeds.delete', selectedBreed._id, (error, result) => {
      if (error) {
        console.error('Error deleting breed:', error);
      } else {
        onDelete();
      }
    });
  } 

  return (
    <div className='resource-profile'>
      <div className='resource-info'>
        <label>BREED:</label>
        <br/>
        <label>Name: {selectedBreed.name}</label>
      </div>
      <div>
        <button onClick={ handleDelete }>DELETE</button>
        <EditBreed onUpdate={(updatedBreed) => {setSelectedBreed(updatedBreed)}} breed={selectedBreed}/>
      </div>
    </div>
  )
}

export default BreedProfile