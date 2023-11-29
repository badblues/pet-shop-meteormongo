import React from 'react'
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { CompetitionsCollection } from '../../../api/competitions';
import '../../styles/Resource.css'

const CompetitionsList = ({ onSelect }) => {
  const isLoading = useSubscribe('competitions');
  const competitions = useFind(() => CompetitionsCollection.find());

  if(isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Competitions:</h2>
      <div className='resource-list'>
        {competitions.map(competition => 
          <div
            key={competition._id}
            onClick={ () => onSelect(competition) }
            >
            <label>
              {competition.name} {competition.location}
            </label>
          </div>
        )}
      </div>
    </div>
  )
};

export default CompetitionsList;