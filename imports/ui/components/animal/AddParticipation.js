import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ParticipationsCollection } from '../../../api/participations';
import { CompetitionsCollection } from '../../../api/competitions';

const AddParticipation = ({ animal }) => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(animal)
  const competitionsLoading = useSubscribe('competitions');
  const participationsLoading = useSubscribe('participations');
  const competitions = useFind(() => CompetitionsCollection.find());

  useEffect(() => {
    setSelectedAnimal(animal)
  }, [animal]);

  const onSubmit = (data) => {

    const participation = {
      animal_id: selectedAnimal._id,
      competition_id: data.competitionId,
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

  if (competitionsLoading() || participationsLoading())
    return (<div>Loading...</div>)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3>ADD PARTICIPATION:</h3>

        <div>
          <label>Animal name: {selectedAnimal.name}</label>
        </div>

        <div>
          <label>
            Competition:
          </label>
          <select
            id="competitionId"
            {...register("competitionId")}
          >
            {competitions.map((competition) => (
              <option
                key={competition._id}
                value={competition._id}
              >
                {competition.name} {competition.location}
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