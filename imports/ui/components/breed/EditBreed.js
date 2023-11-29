import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";

const EditBreed = ({ breed, onUpdate }) => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(breed);

  useEffect(() => {
    setSelectedBreed(breed)
    console.log(breed)
  }, [breed]);

  const onSubmit = (data) => {
    const updatedBreed = {
      name: data.name,
    };
    setLoading(true);
    Meteor.call('breeds.update', selectedBreed._id, updatedBreed, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error updating breed:', error);
      } else {
        updatedBreed._id = selectedBreed._id;
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
            defaultValue={selectedBreed.name}
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