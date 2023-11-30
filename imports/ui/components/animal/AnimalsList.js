import React from 'react'
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { AnimalsCollection } from '../../../api/animals';
import { ClientsCollection } from '../../../api/clients';
import { BreedsCollection } from '../../../api/breeds';
import '../../styles/Resource.css'

const AnimalsList = ({ onSelect }) => {
  const animalsLoading = useSubscribe('animals');
  const clientsLoading = useSubscribe('clients');
  const breedsLoading = useSubscribe('breeds');
  const animals = useFind(() => AnimalsCollection.find());
  const clients = useFind(() => ClientsCollection.find());
  const breeds = useFind(() => BreedsCollection.find());
  animals.forEach((animal) => {
    animal.owner = clients.find((client) => client._id === animal.owner_id)
    animal.breed = breeds.find((breed) => breed._id === animal.breed_id)
  });

  if(animalsLoading()
    || clientsLoading()
    || breedsLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Animals:</h2>
      <div className='resource-list'>
        {animals.map(animal => 
          <div
            key={animal._id}
            onClick={ () => onSelect(animal) }
            >
            <label>
              {animal.name} {animal.breed.name}
            </label>
          </div>
        )}
      </div>
    </div>
  )
};

export default AnimalsList;