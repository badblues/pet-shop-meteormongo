import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";

const AddEmployee = () => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const employee = {
      name: data.name,
      address: data.address,
      position: data.position,
      salary: data.salary,
    };
    setLoading(true);
    Meteor.call('employees.insert', employee, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error inserting employee:', error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>ADD EMPLOYEE:</p>
        <div>
          <label>
            Name:
          </label>
          <input
            id="name"
            type="text"
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
          {loading ? "Adding..." : "Add employee"}
        </button>
      </div>
    </form>
  )
}

export default AddEmployee