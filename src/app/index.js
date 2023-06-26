import React, { useState } from 'react';

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
  // Add more teams as needed
};

export default function Home(){
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
    <div>
      <label htmlFor="task">Task:</label>
      <textarea id="task" value={task} onChange={handleTaskChange} />

      <label htmlFor="team">Team:</label>
      <select id="team" value={selectedTeam} onChange={handleTeamChange}>
        {Object.keys(teams).map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>

      <button onClick={handleAssignClick}>Assign Task</button>

      <div>
        Assigned Member: {assignedMember}
      </div>
    </div>
  );
};
