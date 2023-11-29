import React, { useState } from 'react'
import EditClient from './UpdateClient';

const ClientProfile = ({ client, onDelete }) => {

  const [selectedClient, setSelectedClient] = useState(client);

  const handleDelete = () => {
    Meteor.call('clients.delete', selectedClient._id, (error, result) => {
      if (error) {
        console.error('Error deleting client:', error);
      } else {
        onDelete();
      }
    });
  } 

  return (
    <div className='resource-profile'>
      <div className='resource-info'>
        <label>CLIENT:</label>
        <br/>
        <label>Name: {selectedClient.name}</label>
        <br/>
        <label>Address: {selectedClient.address}</label>
      </div>
      <div>
        <button onClick={ handleDelete }>DELETE</button>
        <EditClient onUpdate={(updatedClient) => {setSelectedClient(updatedClient)}} client={selectedClient}/>
      </div>
    </div>
  )
}

export default ClientProfile