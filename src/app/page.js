'use client';
import React, { useState } from 'react';

// Note: This code is done on assumption that team has different priorities. 
// Due to confusion in question I have also added memberWithPriority component on path /memberWithPriority
const teams = {
  'Team A': {
    members: ['Member 1', 'Member 2', 'Member 3'],
    priority: 1,
  },
  'Team B': {
    members: ['Member 4', 'Member 5'],
    priority: 2,
  },
  'Team C': {
    members: ['Member 6', 'Member 7', 'Member 8', 'Member 9'],
    priority: 3,
  },
  // Add more teams if need
};

export default function TeamsWithPriority() {
  const [task, setTask] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('Team A');
  const [assignedMember, setAssignedMember] = useState('');

  const assignTask = () => {
    const team = teams[selectedTeam];
    const members = team.members;
    const assignedIndex = members.indexOf(assignedMember);
    const nextIndex = (assignedIndex + 1) % members.length;
    const nextMember = members[nextIndex];
    setAssignedMember(nextMember);
  };

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleAssignClick = () => {
    assignTask();
    setTask('');
  };

  return (
    <div className='grid gap-1 gap-y-6 grid-cols-2 mt-10'>
      <label htmlFor="task">Task:</label>
      <textarea id="task" value={task} onChange={handleTaskChange} required/>

      <label htmlFor="team">Team:</label>
      <select id="team" value={selectedTeam} onChange={handleTeamChange}>
        {Object.keys(teams).map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>

      <button onClick={handleAssignClick}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
        Assign Task
      </button>

      <div>
        Assigned Member: {assignedMember}
      </div>
    </div>
  );
};
