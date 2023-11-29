import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";

const EditClient = ({ client, onUpdate }) => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const updatedClient = {
      name: data.name,
      address: data.address
    };
    setLoading(true);
    Meteor.call('clients.update', client._id, updatedClient, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error updating client:', error);
      } else {
        updatedClient._id = client._id;
        onUpdate(updatedClient);
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
            defaultValue={client.name}
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
            defaultValue={client.address}
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
          {loading ? "EDITING..." : "EDIT"}
        </button>
      </div>
    </form>
  )
}

export default EditClient