import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";

const EditEmployee = ({ employee, onUpdate }) => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const updatedEmployee = {
      name: data.name,
      address: data.address,
      position: data.position,
      salary: parseFloat(data.salary)
    };
    setLoading(true);
    Meteor.call('employees.update', employee._id, updatedEmployee, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error updating employee:', error);
      } else {
        updatedEmployee._id = employee._id;
        onUpdate(updatedEmployee);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>EDIT:</p>
        <div>
          <label>
            Name:
          </label>
          <input
            id="name"
            type="text"
            defaultValue={employee.name}
            placeholder="Name..."
            autoComplete="off"
            {...register("name", {
              required: "Enter name",
            })}
          />
          <label>
            {errors.name?.message}
          </label>
        </div>

        <div>
          <label>
            Address:
          </label>
          <input
            id="address"
            type="text"
            defaultValue={employee.address}
            placeholder="Address..."
            autoComplete="off"
            {...register("address", {
              required: "Enter address",
            })}
          />
          <label>
            {errors.address?.message}
          </label>
        </div>

        <div>
          <label>
            Position:
          </label>
          <input
            id="position"
            type="text"
            defaultValue={employee.position}
            placeholder="Position..."
            autoComplete="off"
            {...register("position", {
              required: "Enter position",
            })}
          />
          <label>
            {errors.position?.message}
          </label>
        </div>

        <div>
          <label>
            Salary:
          </label>
          <input
            id="salary"
            type="number"
            step="0.01"
            defaultValue={employee.salary}
            placeholder="Salary..."
            autoComplete="off"
            {...register("salary", {
              required: "Enter salary"
            })}
          />
          <label>
            {errors.salary?.message}
          </label>
        </div>

        <button disabled={loading}>
          {loading ? "EDITING..." : "EDIT"}
        </button>
      </div>
    </form>
  )
}

export default EditEmployee