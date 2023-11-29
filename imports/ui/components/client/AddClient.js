import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";

const AddClient = () => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const client = {
      name: data.name,
      address: data.address,
    };
    setLoading(true);
    Meteor.call('clients.insert', client, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error inserting client:', error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>ADD CLIENT:</p>
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

        <button disabled={loading}>
          {loading ? "Adding..." : "Add client"}
        </button>
      </div>
    </form>
  )
}

export default AddClient