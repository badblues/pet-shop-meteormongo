import React, { useState } from 'react'
import ClientsList from './ClientsList'
import AddClient from './AddClient'
import ClientProfile from './ClientProfile'
import '../../styles/Resource.css'

const ClientsPage = () => {

  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div className='page'>
      <div className='main-container'>
        <ClientsList onSelect={(client) => setSelectedClient(client)}/>
        {selectedClient ? (
          <ClientProfile client={selectedClient} onDelete={() => setSelectedClient(null)}/>
          ) : null}
      </div>
      <AddClient/>
    </div>
  )
}

export default ClientsPage