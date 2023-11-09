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
  
  const canMarkTask = (phaseId: number, taskId: number) => {
    // Allow marking tasks in the next phase if the current phase is completed
    const currentPhaseIndex = phases.findIndex((phase) => phase.id === phaseId);
    if (currentPhaseIndex > 0) {
      const previousPhase = phases[currentPhaseIndex - 1];
      return previousPhase.tasks.every((task) => task.completed);
    }
    
    // Allow marking the first task in a phase without restrictions
    if (taskId === 1) {
      return true;
    }
    
    // Check if all preceding tasks in the same phase are completed
    const currentPhase = phases.find((phase) => phase.id === phaseId);
    const precedingTasks = currentPhase?.tasks.filter((task) => task.id < taskId) || [];
    return (
      precedingTasks.every((task) => task.completed) &&
      currentPhase?.tasks.every((task) => task.id <= taskId)
    );
  };
  
  const handleTaskToggle = (phaseId: number, taskId: number) => {
    if (canMarkTask(phaseId, taskId)) {
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
      alert('Complete all preceding tasks in the same phase first.');
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
                    disabled={!canMarkTask(phase.id, task.id)}
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
