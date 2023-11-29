import React from 'react'
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ApplicationsCollection } from '../../../api/applications';
import { ClientsCollection } from '../../../api/clients';
import { EmployeesCollection } from '../../../api/employees';
import { BreedsCollection } from '../../../api/breeds';
import '../../styles/Resource.css'

const ApplicationsList = ({ onSelect }) => {
  const applicationsLoading = useSubscribe('applications');
  const clientsLoading = useSubscribe('clients');
  const employeesLoading = useSubscribe('employees');
  const breedsLoading = useSubscribe('breeds');
  const applications = useFind(() => ApplicationsCollection.find());
  const clients = useFind(() => ClientsCollection.find());
  const employees = useFind(() => EmployeesCollection.find());
  const breeds = useFind(() => BreedsCollection.find());
  applications.forEach((application) => {
    application.client = clients.find((client) => client._id === application.client_id)
    application.employee = employees.find((employee) => employee._id === application.employee_id)
    application.breed = breeds.find((breed) => breed._id === application.breed_id)
  });

  if(applicationsLoading()
    || clientsLoading()
    || employeesLoading()
    || breedsLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Applications:</h2>
      <div className='resource-list'>
        {applications.map(application => 
          <div
            key={application._id}
            onClick={ () => onSelect(application) }
            >
            <label>
              {application.client.name} {application.breed.name}
            </label>
          </div>
        )}
      </div>
    </div>
  )
};

export default ApplicationsList;