import React, { useState, useEffect } from 'react'
import EditCompetition from './EditCompetition';

const CompetitionProfile = ({ competition, onDelete }) => {

  const [selectedCompetition, setSelectedCompetition] = useState(competition);

  useEffect(() => {
    setSelectedCompetition(competition);
  }, [competition]);

  const handleDelete = () => {
    Meteor.call('competitions.delete', selectedCompetition._id, (error, result) => {
      if (error) {
        console.error('Error deleting competition:', error);
      } else {
        onDelete();
      }
    });
  } 

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
      </div>
      <div>
        <button onClick={ handleDelete }>DELETE</button>
        <EditCompetition competition={selectedCompetition} onUpdate={(updatedCompetition) => {setSelectedCompetition(updatedCompetition)}}/>
      </div>
    </div>
  )
}

export default CompetitionProfile