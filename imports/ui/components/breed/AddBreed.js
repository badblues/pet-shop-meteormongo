import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";

const AddBreed = () => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const breed = {
      name: data.name,
    };
    setLoading(true);
    Meteor.call('breeds.insert', breed, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error inserting breed:', error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>ADD BREED:</p>
        <div>
          <label>
            Breed name:
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

        <button disabled={loading}>
          {loading ? "Adding..." : "Add breed"}
        </button>
      </div>
    </form>
  )
}

export default AddBreed