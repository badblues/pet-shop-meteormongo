import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ParticipationsCollection } from '../../../api/participations';
import { AnimalsCollection } from '../../../api/animals';

const AddParticipation = ({ competition }) => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(competition)
  const animalsLoading = useSubscribe('animals');
  const participationsLoading = useSubscribe('participations');
  const animals = useFind(() => AnimalsCollection.find());

  useEffect(() => {
    setSelectedCompetition(competition)
  }, [competition]);

  const onSubmit = (data) => {

    const participation = {
      competition_id: selectedCompetition._id,
      animal_id: data.animalId,
      award: data.award
    };
    console.log(participation)
    setLoading(true);
    Meteor.call('participations.insert', participation, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error inserting participation:', error);
      } else {
      }
    });
  };

  if (animalsLoading() || participationsLoading())
    return (<div>Loading...</div>)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3>ADD PARTICIPATION:</h3>

        <div>
          <label>Competition name: {selectedCompetition.name}</label>
        </div>

        <div>
          <label>
            Animal:
          </label>
          <select
            id="animalId"
            {...register("animalId")}
          >
            {animals.map((animal) => (
              <option
                key={animal._id}
                value={animal._id}
              >
                {animal.name} {animal.location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            Award:
          </label>
          <input
            id="award"
            type="text"
            placeholder="Award..."
            autoComplete="off"
            {...register("award", {
              required: "Enter award",
            })}
          />
          <label>
            {errors.award?.message}
          </label>
        </div>

        <button disabled={loading}>
          {loading ? "ADDING..." : "ADD PARTICIPATION"}
        </button>
      </div>
    </form>
  )
}

export default AddParticipation