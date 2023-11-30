import React, { useState, useEffect } from 'react'
import EditAnimal from './EditAnimal';
import AddParticipation from './AddParticipation';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ParticipationsCollection } from '../../../api/participations';
import { CompetitionsCollection } from '../../../api/competitions';

const AnimalProfile = ({ animal, onDelete }) => {

  const [selectedAnimal, setSelectedAnimal] = useState(animal);
  const competitionsLoading = useSubscribe('competitions');
  const participationsLoading = useSubscribe('participations');
  const competitions = useFind(() => CompetitionsCollection.find());
  const rawParticipations = useFind(() => ParticipationsCollection.find());
  var filteredParticipations = rawParticipations.filter(participation => participation.animal_id === selectedAnimal._id);
  filteredParticipations.forEach((participation) => {
    participation.competition = competitions.find((competition) => competition._id === participation.competition_id)
  });
  

  useEffect(() => {
    setSelectedAnimal(animal)
    filteredParticipations = rawParticipations.filter(participation => participation.animal_id === selectedAnimal._id);
    filteredParticipations.forEach((participation) => {
      participation.competition = competitions.find((competition) => competition._id === participation.competition_id)
    });
  }, [animal]);

  const handleAnimalDelete = () => {
    Meteor.call('animals.delete', selectedAnimal._id, (error, result) => {
      if (error) {
        console.error('Error deleting animal:', error);
      } else {
        onDelete();
      }
    });
  } 

  const handleParticipationDelete = (participationId) => {
    Meteor.call('participations.delete', participationId, (error, result) => {
      if (error) {
        console.error('Error deleting participation:', error);
      } else {
      }
    });
  }

  if(participationsLoading() || competitionsLoading())
    return (<div>Loading...</div>)

  return (
    <div className='resource-profile'>
      <div className='resource-info'>
        <h3>ANIMAL:</h3>
        <label>Name: {selectedAnimal.name}</label>
        <br/>
        <label>Age: {selectedAnimal.age}</label>
        <br/>
        <label>Gender: {selectedAnimal.gender}</label>
        <br/>
        <label>Breed: {selectedAnimal.breed.name}</label>
        <br/>
        <label>Exterior: {selectedAnimal.exterior}</label>
        <br/>
        <label>Pedigree: {selectedAnimal.pedigree}</label>
        <br/>
        <label>Veterinarian: {selectedAnimal.veterinarian}</label>
        <br/>
        <label>Owner: {selectedAnimal.owner?.name}</label>
        <br/>
        <h4>Competition participations:</h4>
        {filteredParticipations.map(participation => 
          <div
            key={participation._id}
            >
            <label>
              {participation.competition.name} {participation.award}
            </label>
            <button onClick={() => handleParticipationDelete(participation._id)}>X</button>
          </div>
        )}
      </div>
      <div>
        <button onClick={ handleAnimalDelete }>DELETE</button>
        <EditAnimal onUpdate={(updatedAnimal) => {setSelectedAnimal(updatedAnimal)}} animal={selectedAnimal}/>
        <AddParticipation animal={selectedAnimal}/>
      </div>
    </div>
  )
}

export default AnimalProfile