import React, { useState } from 'react'
import EditEmployee from './EditEmployee';

const EmployeeProfile = ({ employee, onDelete }) => {

  const [selectedEmployee, setSelectedEmployee] = useState(employee);

  const handleDelete = () => {
    Meteor.call('employees.delete', selectedEmployee._id, (error, result) => {
      if (error) {
        console.error('Error deleting employee:', error);
      } else {
        onDelete();
      }
    });
  } 

  return (
    <div className='resource-profile'>
      <div className='resource-info'>
        <label>EMPLOYEE:</label>
        <br/>
        <label>Name: {selectedEmployee.name}</label>
        <br/>
        <label>Address: {selectedEmployee.address}</label>
        <br/>
        <label>Position: {selectedEmployee.position}</label>
        <br/>
        <label>Salary: {selectedEmployee.salary}</label>
      </div>
      <div>
        <button onClick={ handleDelete }>DELETE</button>
        <EditEmployee onUpdate={(updatedEmployee) => {setSelectedEmployee(updatedEmployee)}} employee={selectedEmployee}/>
      </div>
    </div>
  )
}

export default EmployeeProfile