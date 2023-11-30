import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClientsCollection } from '../../../api/clients';
import { EmployeesCollection } from '../../../api/employees';
import { BreedsCollection } from '../../../api/breeds';

const AddApplication = () => {

  const genderNullStr = "Not important"
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const clientsLoading = useSubscribe('clients');
  const employeesLoading = useSubscribe('employees');
  const breedsLoading = useSubscribe('breeds');
  const clients = useFind(() => ClientsCollection.find());
  const employees = useFind(() => EmployeesCollection.find());
  const breeds = useFind(() => BreedsCollection.find());
  

  const onSubmit = (data) => {
    const application = {
      client_id: data.clientId,
      employee_id: data.employeeId,
      breed_id: data.breedId,
      gender: data.gender,
      application_date: new Date(),
      completed: false
    };
    if (application.gender === genderNullStr)
      delete application.gender
    console.log(application)
    setLoading(true);
    Meteor.call('applications.insert', application, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error inserting application:', error);
      }
    });
  };

  if (clientsLoading() || employeesLoading() || breedsLoading())
   return (<div>Loading...</div>)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>ADD APPLICATION:</p>
        <div>
          <label>
            Client:
          </label>
          <select
            id="client"
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
            defaultValue={null}
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

        <button disabled={loading}>
          {loading ? "Adding..." : "Add Application"}
        </button>
      </div>
    </form>
  )
}

export default AddApplication