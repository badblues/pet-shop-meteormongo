import React, { useState } from 'react'
import CompetitionsList from './CompetitionsList'
import AddCompetition from './AddCompetition'
import CompetitionProfile from './CompetitionProfile'
import '../../styles/Resource.css'

const CompetitionsPage = () => {

  const [selectedCompetition, setSelectedCompetition] = useState(null);

  return (
    <div className='page'>
      <div className='main-container'>
        <CompetitionsList onSelect={(Competition) => setSelectedCompetition(Competition)}/>
        {selectedCompetition ? (
          <CompetitionProfile Competition={selectedCompetition} onDelete={() => setSelectedCompetition(null)}/>
          ) : null}
      </div>
      <AddCompetition/>
    </div>
  )
}

export default CompetitionsPage