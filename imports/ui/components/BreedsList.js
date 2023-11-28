import React from 'react'
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { BreedsCollection } from '../../api/breeds';

const BreedsList = () => {
  const isLoading = useSubscribe('breeds');
  const breeds = useFind(() => BreedsCollection.find());

  if(isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Breeds:</h2>
      {breeds.map(breed => 
        <div key={breed._id}>
          <p>
            {breed.name}
          </p>
        </div>
      )}
    </>
  )
};

export default BreedsList;