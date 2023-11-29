import React from 'react'
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClientsCollection } from '../../../api/clients';
import '../../styles/Resource.css'

const ClientsList = ({ onSelect }) => {
  const isLoading = useSubscribe('clients');
  const clients = useFind(() => ClientsCollection.find());

  if(isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Clients:</h2>
      <div className='resource-list'>
        {clients.map(client => 
          <div
            key={client._id}
            onClick={ () => onSelect(client) }
            >
            <label>
              {client.name}
            </label>
          </div>
        )}
      </div>
    </div>
  )
};

export default ClientsList;