import React from 'react'
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { BreedsCollection } from '../../../api/breeds';
import '../../styles/Styles.css'

const BreedsList = ({ onSelect }) => {
  const isLoading = useSubscribe('breeds');
  const breeds = useFind(() => BreedsCollection.find());

  if(isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Breeds:</h2>
      <div className='breed-list'>
        {breeds.map(breed => 
          <div
            key={breed._id}
            onClick={ () => onSelect(breed) }
            >
            <label>
              {breed.name}
            </label>
          </div>
        )}
      </div>
    </div>
  )
};

export default BreedsList;