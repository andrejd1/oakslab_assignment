import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

interface Phase {
  id: number;
  name: string;
  tasks: Task[];
}

const initialPhases: Phase[] = [
  {
    id: 1,
    name: 'Phase 1',
    tasks: [
      { id: 1, description: 'Task 1.1', completed: false },
      { id: 2, description: 'Task 1.2', completed: false },
    ],
  },
  {
    id: 2,
    name: 'Phase 2',
    tasks: [
      { id: 3, description: 'Task 2.1', completed: false },
      { id: 4, description: 'Task 2.2', completed: false },
    ],
  },
  {
    id: 3,
    name: 'Phase 3',
    tasks: [
      { id: 5, description: 'Task 3.1', completed: false },
      { id: 6, description: 'Task 3.2', completed: false },
    ],
  },
  // Add more phases as needed
];

const Home: React.FC = () => {
  const [phases, setPhases] = useState(initialPhases);
  
  useEffect(() => {
    const storedPhases = localStorage.getItem('phases');
    if (storedPhases) {
      setPhases(JSON.parse(storedPhases));
    }
  }, []);
  
  const saveToLocalStorage = () => {
    localStorage.setItem('phases', JSON.stringify(phases));
  };
  
  const canMarkTask = (phaseId: number) => {
    // Check if all tasks in the previous phase are completed
    if (phaseId > 1) {
      const prevPhase = phases.find((phase) => phase.id === phaseId - 1);
      return prevPhase?.tasks.every((task) => task.completed);
    }
    return true; // If it's the first phase, allow marking tasks
  };
  
  const handleTaskToggle = (phaseId: number, taskId: number) => {
    if (canMarkTask(phaseId)) {
      const updatedPhases = phases.map((phase) => {
        if (phase.id === phaseId) {
          const updatedTasks = phase.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          return { ...phase, tasks: updatedTasks };
        }
        return phase;
      });
      
      setPhases(updatedPhases);
      saveToLocalStorage();
    } else {
      alert('Complete all tasks in the previous phase first.');
    }
  };
  
  return (
    <div>
      {phases.map((phase) => (
        <div key={phase.id}>
          <Typography variant="h4">
            {phase.name}
            {phase.tasks.every((task) => task.completed) && ' ✔️'}
          </Typography>
          {phase.tasks.map((task) => (
            <div key={task.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleTaskToggle(phase.id, task.id)}
                    color="primary"
                    disabled={!canMarkTask(phase.id)}
                  />
                }
                label={task.description}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
