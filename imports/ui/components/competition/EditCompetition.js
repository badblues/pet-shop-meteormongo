import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";

const EditCompetition = ({ competition, onUpdate }) => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(competition);

  useEffect(() => {
    setSelectedCompetition(competition)
    console.log(competition)
  }, [competition]);

  const onSubmit = (data) => {
    const updatedCompetition = {
      name: data.name,
      location: data.location,
      date: data.date,
    };
    setLoading(true);
    Meteor.call('competitions.update', selectedCompetition._id, updatedCompetition, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error updating competition:', error);
      } else {
        updatedCompetition._id = selectedCompetition._id;
        onUpdate(updatedCompetition);
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
            defaultValue={selectedCompetition.name}
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
            location:
          </label>
          <input
            id="location"
            type="text"
            defaultValue={selectedCompetition.location}
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
            defaultValue={selectedCompetition.date}
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
          {loading ? "EDITING..." : "EDIT"}
        </button>
      </div>
    </form>
  )
}

export default EditCompetition