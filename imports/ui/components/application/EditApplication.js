import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClientsCollection } from '../../../api/clients';
import { EmployeesCollection } from '../../../api/employees';
import { BreedsCollection } from '../../../api/breeds';

const EditApplication = ({ application, onUpdate }) => {

  const genderNullStr = "Not important"
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(application)
  const clientsLoading = useSubscribe('clients');
  const employeesLoading = useSubscribe('employees');
  const breedsLoading = useSubscribe('breeds');
  const clients = useFind(() => ClientsCollection.find());
  const employees = useFind(() => EmployeesCollection.find());
  const breeds = useFind(() => BreedsCollection.find());

  useEffect(() => {
    setSelectedApplication(application)
  }, [application]);

  const onSubmit = (data) => {
    var updatedApplication = {
      client_id: data.clientId,
      employee_id: data.employeeId,
      breed_id: data.breedId,
      gender: data.gender,
      application_date: selectedApplication.application_date,
      completed: data.completed
    };
    console.log(updatedApplication)
    if (updatedApplication.gender === genderNullStr)
      delete updatedApplication.gender
    console.log(updatedApplication)
    setLoading(true);
    Meteor.call('applications.update', selectedApplication._id, updatedApplication, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error updating application:', error);
      } else {
        console.log("result: " + result);
        updatedApplication._id = selectedApplication._id;
        updatedApplication.client = clients.find((client) => client._id === updatedApplication.client_id)
        updatedApplication.employee = employees.find((employee) => employee._id === updatedApplication.employee_id)
        updatedApplication.breed = breeds.find((breed) => breed._id === updatedApplication.breed_id)
        onUpdate(updatedApplication);
      }
    });
  };



  if (clientsLoading() || employeesLoading() || breedsLoading())
    return (<div>Loading...</div>)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>EDIT:</p>
        <div>
          <label>
            Client:
          </label>
          <select
            id="client"
            defaultValue={selectedApplication.client_id}
            {...register("clientId", {
              required: "Choose client",
            })}
          >
            {clients.map((client) => (
              <option
                key={client._id}
                value={client._id}
              >
                {client.name} {client.address}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            Employee:
          </label>
          <select
            id="employee"
            defaultValue={selectedApplication.employee_id}
            {...register("employeeId")}
          >
            {employees.map((employee) => (
              <option
              key={employee._id}
                value={employee._id}
              >
                {employee.name} {employee.position}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            Breed:
          </label>
          <select
            id="breed"
            defaultValue={selectedApplication.breed_id}
            {...register("breedId", {
              required: "Choose breed",
            })}
          >
            {breeds.map((breed) => (
              <option
                key={breed._id}
                value={breed._id}
              >
                {breed.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            Gender:
          </label>
          <select
            id="gender"
            defaultValue={selectedApplication.gender}
            {...register("gender")}
          >
            <option key={0} value={null}>{genderNullStr}</option>
            <option key={1} value={'male'}>
              MALE
            </option>
            <option key={2} value={'female'}>
              FEMALE
            </option>
          </select>
        </div>

        <div>
          <label>
            Completed:
          </label>
          <input
            id="completed"
            type="checkbox"
            defaultChecked={selectedApplication.completed}
            {...register("completed")}
          >
          </input>
        </div>

        <button disabled={loading}>
          {loading ? "EDITING..." : "EDIT"}
        </button>
      </div>
    </form>
  )
}

export default EditApplication