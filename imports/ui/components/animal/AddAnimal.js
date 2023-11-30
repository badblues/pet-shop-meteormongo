import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClientsCollection } from '../../../api/clients';
import { BreedsCollection } from '../../../api/breeds';

const AddAnimal = () => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const clientsLoading = useSubscribe('clients');
  const breedsLoading = useSubscribe('breeds');
  const clients = useFind(() => ClientsCollection.find());
  const breeds = useFind(() => BreedsCollection.find());
  

  const onSubmit = (data) => {
    const animal = {
      name: data.name,
      age: parseInt(data.age, 10),
      gender: data.gender,
      breed_id: data.breedId,
      exterior: data.exterior,
      pedigree: data.pedigree,
      veterinarian: data.veterinarian,
      owner_id: data.clientId,
    };
    if (animal.owner_id === "")
      delete animal.owner_id
    setLoading(true);
    Meteor.call('animals.insert', animal, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error inserting animal:', error);
      }
    });
  };

  if (clientsLoading() || breedsLoading())
   return (<div>Loading...</div>)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>ADD ANIMAL:</p>

        <div>
          <label>
            Animal name:
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
            Age:
          </label>
          <input
            id="age"
            type="number"
            placeholder="Age..."
            {...register("age", {
              required: "Enter age",
            })}
          />
          <label>
            {errors.age?.message}
          </label>
        </div>

        <div>
          <label>
            Gender:
          </label>
          <select
            id="gender"
            defaultValue={'male'}
            {...register("gender")}
          >
            <option key={1} value={'male'}>
              MALE
            </option>
            <option key={2} value={'female'}>
              FEMALE
            </option>
          </select>
        </div>

        <div>
          <label>
            Breed:
          </label>
          <select
            id="breed"
            {...register("breedId", {
              required: "Choose breed",
            })}
          >
            {breeds.map((breed) => (
              <option
                key={breed._id}
                value={breed._id}
              >
                {breed.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            Exterior:
          </label>
          <input
            id="exterior"
            type="text"
            placeholder="Exterior..."
            autoComplete="off"
            {...register("exterior", {
            })}
          />
          <label>
            {errors.exterior?.message}
          </label>
        </div>

        <div>
          <label>
            Pedigree:
          </label>
          <input
            id="pedigree"
            type="text"
            placeholder="Pedigree..."
            autoComplete="off"
            {...register("pedigree", {
            })}
          />
          <label>
            {errors.pedigree?.message}
          </label>
        </div>

        <div>
          <label>
            Veterinarian:
          </label>
          <input
            id="veterinarian"
            type="text"
            placeholder="Veterinarian..."
            autoComplete="off"
            {...register("veterinarian", {
            })}
          />
          <label>
            {errors.veterinarian?.message}
          </label>
        </div>


        <div>
          <label>
            Owner:
          </label>
          <select
            id="client"
            defaultValue={null}
            {...register("clientId", {
            })}
          >
            <option key={0} value={null}></option>
            {clients.map((client) => (
              <option
                key={client._id}
                value={client._id}
              >
                {client.name} {client.address}
              </option>
            ))}
          </select>
        </div>


        <button disabled={loading}>
          {loading ? "Adding..." : "Add Animal"}
        </button>
      </div>
    </form>
  )
}

export default AddAnimal