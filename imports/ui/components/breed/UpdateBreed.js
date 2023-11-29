import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";

const EditBreed = ({ breed, onUpdate }) => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const updatedBreed = {
      name: data.name,
    };
    setLoading(true);
    Meteor.call('breeds.update', breed._id, updatedBreed, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error updating breed:', error);
      } else {
        updatedBreed._id = breed._id;
        onUpdate(updatedBreed);
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
            defaultValue={breed.name}
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

        <button disabled={loading}>
          {loading ? "EDITING..." : "EDIT"}
        </button>
      </div>
    </form>
  )
}

export default EditBreed