import React, { useState } from 'react'
import EmployeesList from './EmployeesList'
import AddEmployee from './AddEmployee'
import EmployeeProfile from './EmployeeProfile'
import '../../styles/Resource.css'

const EmployeesPage = () => {

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className='page'>
      <div className='main-container'>
        <EmployeesList onSelect={(Employee) => setSelectedEmployee(Employee)}/>
        {selectedEmployee ? (
          <EmployeeProfile Employee={selectedEmployee} onDelete={() => setSelectedEmployee(null)}/>
          ) : null}
      </div>
      <AddEmployee/>
    </div>
  )
}

export default EmployeesPage