import React from 'react'
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { EmployeesCollection } from '../../../api/employees';
import '../../styles/Resource.css'

const EmployeesList = ({ onSelect }) => {
  const isLoading = useSubscribe('employees');
  const employees = useFind(() => EmployeesCollection.find());

  if(isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employees:</h2>
      <div className='resource-list'>
        {employees.map(employee => 
          <div
            key={employee._id}
            onClick={() => onSelect(employee)}
            >
            <label>
              {employee.name}
            </label>
          </div>
        )}
      </div>
    </div>
  )
};

export default EmployeesList;