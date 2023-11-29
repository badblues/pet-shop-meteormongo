import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";

const AddCompetition = () => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const competition = {
      name: data.name,
      location: data.location,
      date: data.date,
    };
    setLoading(true);
    Meteor.call('competitions.insert', competition, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error inserting competition:', error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>ADD BREED:</p>
        <div>
          <label>
            Competition name:
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
            Competition location:
          </label>
          <input
            id="location"
            type="text"
            placeholder="Location..."
            autoComplete="off"
            {...register("location", {
              required: "Enter location",
            })}
          />
          <label>
            {errors.location?.message}
          </label>
        </div>

        <div>
          <label>
            Competition date:
          </label>
          <input
            id="date"
            type="date"
            autoComplete="off"
            {...register("date", {
              required: "Enter date",
            })}
          />
          <label>
            {errors.date?.message}
          </label>
        </div>

        <button disabled={loading}>
          {loading ? "Adding..." : "Add competition"}
        </button>
      </div>
    </form>
  )
}

export default AddCompetition