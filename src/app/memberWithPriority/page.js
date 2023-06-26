'use client';
import React, { useState } from 'react';

const teams = {
  'Team A': {
    members: [
      { name: 'Member 1', priority: 1 },
      { name: 'Member 2', priority: 2 },
      { name: 'Member 3', priority: 3 },
    ],
  },
  'Team B': {
    members: [
      { name: 'Member 4', priority: 2 },
      { name: 'Member 5', priority: 1 },
    ],
  },
  'Team C': {
    members: [
      { name: 'Member 6', priority: 3 },
      { name: 'Member 7', priority: 2 },
      { name: 'Member 8', priority: 1 },
      { name: 'Member 9', priority: 3 },
    ],
  },
  // Add more teams as needed
};

export default function MembersWithPriority() {
  const [task, setTask] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('Team A');
  const [assignedMember, setAssignedMember] = useState('');

  const assignTask = () => {
    const team = teams[selectedTeam];
    const members = team.members;

    // Find the member with the highest priority
    const highestPriority = Math.max(...members.map((member) => member.priority));
    const highestPriorityMembers = members.filter((member) => member.priority === highestPriority);

    // Get the last assigned member for the selected team
    const lastAssignedMember = assignedMember;

    // Find the index of the last assigned member
    const lastAssignedIndex = members.findIndex((member) => member.name === lastAssignedMember);

    // Find the next member index to assign (incrementing index in a circular manner)
    const nextIndex = (lastAssignedIndex + 1) % highestPriorityMembers.length;
    const nextMember = highestPriorityMembers[nextIndex].name;

    setAssignedMember(nextMember);
  };

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    setAssignedMember(''); // Reset assigned member when team changes
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
