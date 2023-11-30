import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from "react-hook-form";
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClientsCollection } from '../../../api/clients';
import { BreedsCollection } from '../../../api/breeds';

const EditAnimal = ({ animal, onUpdate }) => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(animal)
  const clientsLoading = useSubscribe('clients');

  const breedsLoading = useSubscribe('breeds');
  const clients = useFind(() => ClientsCollection.find());
  const breeds = useFind(() => BreedsCollection.find());

  useEffect(() => {
    setSelectedAnimal(animal)
  }, [animal]);

  const onSubmit = (data) => {

    const updatedAnimal = {
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
    Meteor.call('animals.update', selectedAnimal._id, updatedAnimal, (error, result) => {
      setLoading(false);
      if (error) {
        console.error('Error updating animal:', error);
      } else {
        updatedAnimal._id = selectedAnimal._id;
        updatedAnimal.owner = clients.find((client) => client._id === updatedAnimal.owner_id)
        updatedAnimal.breed = breeds.find((breed) => breed._id === updatedAnimal.breed_id)
        onUpdate(updatedAnimal);
      }
    });
  };

  if (clientsLoading() || breedsLoading())
    return (<div>Loading...</div>)

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
            defaultValue={selectedAnimal.name}
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
            defaultValue={selectedAnimal.age}
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
            defaultValue={selectedAnimal.gender}
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
            defaultValue={selectedAnimal.breed_id}
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
            defaultValue={selectedAnimal.exterior}
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
            defaultValue={selectedAnimal.pedigree}
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
            defaultValue={selectedAnimal.veterinarian}
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
            defaultValue={selectedAnimal.owner_id}
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
          {loading ? "EDITING..." : "EDIT"}
        </button>
      </div>
    </form>
  )
}

export default EditAnimal