import React, { useState, useEffect } from 'react'
import EditClient from './EditClient';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { AnimalsCollection } from '../../../api/animals'
import { ApplicationsCollection } from '../../../api/applications'
import { BreedsCollection } from '../../../api/breeds';

const ClientProfile = ({ client, onDelete }) => {

  const [selectedClient, setSelectedClient] = useState(client);
  const animalsLoading = useSubscribe('animals')
  const applicationsLoading = useSubscribe('applications')
  const breedsLoading = useSubscribe('breeds')
  const rawAnimals = useFind(() => AnimalsCollection.find())
  const rawApplications = useFind(() => ApplicationsCollection.find())
  const rawBreeds = useFind(() => BreedsCollection.find())
  var filteredAnimals = rawAnimals.filter(animal => animal.owner_id === selectedClient._id);
  var filteredApplications = rawApplications.filter(application => application.client_id === selectedClient._id);
  filteredAnimals.forEach((animal) => {
    animal.breed = rawBreeds.find((breed) => breed._id === animal.breed_id)
  });
  filteredApplications.forEach((application) => {
    application.breed = rawBreeds.find((breed) => breed._id === application.breed_id)
  });

  useEffect(() => {
    setSelectedClient(client)
  }, [client]);

  const handleDelete = () => {
    Meteor.call('clients.delete', selectedClient._id, (error, result) => {
      if (error) {
        console.error('Error deleting client:', error);
      } else {
        onDelete();
      }
    });
  } 

  if (animalsLoading() || applicationsLoading() || breedsLoading())
    return(<div>Loading...</div>)

  return (
    <div className='resource-profile'>
      <div className='resource-info'>
        <label>CLIENT:</label>
        <br/>
        <label>Name: {selectedClient.name}</label>
        <br/>
        <label>Address: {selectedClient.address}</label>
        <h4>Animals:</h4>
        {filteredAnimals.map(animal => 
          <div
            key={animal._id}
            >
            <label>
              {animal.name} {animal.breed.name}
            </label>
          </div>
        )}
        <h4>Applications:</h4>
        {filteredApplications.map(application => 
          <div
            key={application._id}
            >
            <label>
              {application.breed.name} {application.gender}
            </label>
          </div>
        )}
      </div>
      <div>
        <button onClick={ handleDelete }>DELETE</button>
        <EditClient onUpdate={(updatedClient) => {setSelectedClient(updatedClient)}} client={selectedClient}/>
      </div>
    </div>
  )
}

export default ClientProfile
