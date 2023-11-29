import React, { useState, useEffect } from 'react'
import EditBreed from './EditBreed';

const BreedProfile = ({ breed, onDelete }) => {

  const [selectedBreed, setSelectedBreed] = useState(breed);

  useEffect(() => {
    setSelectedBreed(breed);
  }, [breed]);

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
        <EditBreed breed={selectedBreed} onUpdate={(updatedBreed) => {setSelectedBreed(updatedBreed)}}/>
      </div>
    </div>
  )
}

export default BreedProfile