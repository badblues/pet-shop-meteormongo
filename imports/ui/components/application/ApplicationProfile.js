import React, { useState, useEffect } from 'react'
import EditApplication from './EditApplication';

const ApplicationProfile = ({ application, onDelete }) => {

  const [selectedApplication, setSelectedApplication] = useState(application);

  useEffect(() => {
    setSelectedApplication(application)
  }, [application]);

  const handleDelete = () => {
    Meteor.call('applications.delete', selectedApplication._id, (error, result) => {
      if (error) {
        console.error('Error deleting application:', error);
      } else {
        onDelete();
      }
    });
  } 

  return (
    <div className='resource-profile'>
      <div className='resource-info'>
        <label>APPLICATION:</label>
        <br/>
        <label>Client: {selectedApplication.client.name}</label>
        <br/>
        <label>Employee: {selectedApplication.employee.name}</label>
        <br/>
        <label>Breed: {selectedApplication.breed.name}</label>
        <br/>
        <label>Gender: {selectedApplication.gender}</label>
        <br/>
        <label>Date: {selectedApplication.application_date.toLocaleString()}</label>
        <br/>
        <label>Completed: {selectedApplication.completed}</label>
      </div>
      <div>
        <button onClick={ handleDelete }>DELETE</button>
        <EditApplication onUpdate={(updatedApplication) => {setSelectedApplication(updatedApplication)}} application={selectedApplication}/>
      </div>
    </div>
  )
}

export default ApplicationProfile