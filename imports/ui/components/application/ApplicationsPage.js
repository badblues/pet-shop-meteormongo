import React, { useState } from 'react'
import ApplicationsList from './ApplicationsList'
import AddApplication from './AddApplication'
import ApplicationProfile from './ApplicationProfile'
import '../../styles/Resource.css'

const ApplicationsPage = () => {

  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <div className='page'>
      <div className='main-container'>
        <ApplicationsList onSelect={(application) => setSelectedApplication(application)}/>
        {selectedApplication ? (
          <ApplicationProfile application={selectedApplication} onDelete={() => setSelectedApplication(null)}/>
          ) : null}
      </div>
      <AddApplication/>
    </div>
  )
}

export default ApplicationsPage