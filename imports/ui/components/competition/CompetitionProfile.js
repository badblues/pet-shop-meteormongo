import React, { useState, useEffect } from 'react'
import EditCompetition from './EditCompetition';
import AddParticipation from './AddParticipation';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ParticipationsCollection } from '../../../api/participations';
import { AnimalsCollection } from '../../../api/animals';

const CompetitionProfile = ({ competition, onDelete }) => {

  const [selectedCompetition, setSelectedCompetition] = useState(competition);
  const animalsLoading = useSubscribe('animals');
  const participationsLoading = useSubscribe('participations');
  const animals = useFind(() => AnimalsCollection.find());
  const rawParticipations = useFind(() => ParticipationsCollection.find());
  var filteredParticipations = rawParticipations.filter(participation => participation.competition_id === selectedCompetition._id);
  filteredParticipations.forEach((participation) => {
    participation.animal = animals.find((animal) => animal._id === participation.animal_id)
  });

  useEffect(() => {
    setSelectedCompetition(competition);
    var filteredParticipations = rawParticipations.filter(participation => participation.competition_id === selectedCompetition._id);
    filteredParticipations.forEach((participation) => {
      participation.animal = animals.find((animal) => animal._id === participation.animal_id)
    });
  }, [competition]);

  const handleCompetitionDelete = () => {
    Meteor.call('competitions.delete', selectedCompetition._id, (error, result) => {
      if (error) {
        console.error('Error deleting competition:', error);
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

  if(participationsLoading() || animalsLoading())
    return (<div>Loading...</div>)

  return (
    <div className='resource-profile'>
      <div className='resource-info'>
        <label>COMPETITION:</label>
        <br/>
        <label>Name: {selectedCompetition.name}</label>
        <br/>
        <label>Location: {selectedCompetition.location}</label>
        <br/>
        <label>Date: {selectedCompetition.date.toLocaleString()}</label>
        <br/>
        <h4>Animal participants:</h4>
        {filteredParticipations.map(participation => 
          <div
            key={participation._id}
            >
            <label>
              {participation.animal.name} {participation.award}
            </label>
            <button onClick={() => handleParticipationDelete(participation._id)}>X</button>
          </div>
        )}
      </div>
      <div>
        <button onClick={ handleCompetitionDelete }>DELETE</button>
        <EditCompetition competition={selectedCompetition} onUpdate={(updatedCompetition) => {setSelectedCompetition(updatedCompetition)}}/>
        <AddParticipation competition={selectedCompetition}/>
      </div>
    </div>
  )
}

export default CompetitionProfile