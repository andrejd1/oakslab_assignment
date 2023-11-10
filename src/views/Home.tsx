import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

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

interface AppData {
  title: string;
  phases: Phase[];
}

const initialData: AppData = {
  title: "My startup progress",
  phases: [
    {
      id: 1,
      name: "Foundation",
      tasks: [
        { id: 1, description: "Setup virtual office", completed: false },
        { id: 2, description: "Set mission & vision", completed: false },
        { id: 3, description: "Select business name", completed: false },
        { id: 4, description: "Buy domains", completed: false },
      ],
    },
    {
      id: 2,
      name: "Discovery",
      tasks: [
        { id: 5, description: "Create roadmap", completed: false },
        { id: 6, description: "Competitor analysis", completed: false },
      ],
    },
    {
      id: 3,
      name: "Delivery",
      tasks: [
        { id: 7, description: "Release marketing website", completed: false },
        { id: 8, description: "Release MVP", completed: false },
      ],
    },
  ],
};

const Home: React.FC = () => {
  const [appData, setAppData] = useState<AppData>(initialData);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [randomFact, setRandomFact] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("appData");
    if (storedData) {
      setAppData(JSON.parse(storedData));
    }
  }, []);

  const saveToLocalStorage = (data: AppData) => {
    localStorage.setItem("appData", JSON.stringify(data));
  };

  const canMarkTask = (phaseIndex: number, taskIndex: number) => {
    if (phaseIndex === 0) {
      return taskIndex < appData.phases[phaseIndex].tasks.length;
    }

    const currentPhase = appData.phases[phaseIndex];
    const previousPhase = appData.phases[phaseIndex - 1];

    // Check if all tasks in the previous phase are completed
    if (!previousPhase.tasks.every((task) => task.completed)) {
      return false;
    }

    // Check if the task is within the current phase
    return taskIndex < currentPhase.tasks.length;
  };

  const handleTaskToggle = (phaseIndex: number, taskIndex: number) => {
    const updatedData: AppData = {
      ...appData,
      phases: appData.phases.map((phase, idx) => {
        if (idx === phaseIndex) {
          const updatedTasks = phase.tasks.map((task, taskIdx) =>
            taskIdx === taskIndex
              ? { ...task, completed: !task.completed }
              : task,
          );
          return { ...phase, tasks: updatedTasks };
        }
        return phase;
      }),
    };

    setAppData(updatedData);
    saveToLocalStorage(updatedData);
  };

  const areAllPhasesCompleted = () => {
    return appData.phases.every((phase) =>
      phase.tasks.every((task) => task.completed),
    );
  };

  const handleCompleteAllPhases = () => {
    const updatedData: AppData = {
      ...appData,
      phases: appData.phases.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((task) => ({ ...task, completed: true })),
      })),
    };

    setAppData(updatedData);
    saveToLocalStorage(updatedData);

    // Fetch a random fact when all phases are completed
    if (areAllPhasesCompleted()) {
      fetch("https://uselessfacts.jsph.pl/random.json")
        .then((response) => response.json())
        .then((data) => {
          setRandomFact(data.text);
          setOpenDialog(true);
        })
        .catch((error) =>
          console.error("Failed to fetch a random fact:", error),
        );
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRandomFact(null);
  };

  return (
    <div>
      <Typography variant="h3" style={{ marginBottom: "3rem" }}>
        {appData.title}
      </Typography>
      {appData.phases.map((phase, phaseIndex) => (
        <div
          key={phase.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                marginRight: "1rem",
              }}
            >
              {phaseIndex + 1}
            </div>
            <Typography variant="h4">
              {phase.name}
              {phase.tasks.every((task) => task.completed) && " ✔️"}
            </Typography>
          </div>
          {phase.tasks.map((task, taskIndex) => (
            <div key={task.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleTaskToggle(phaseIndex, taskIndex)}
                    color="primary"
                    disabled={!canMarkTask(phaseIndex, taskIndex)}
                  />
                }
                label={task.description}
              />
            </div>
          ))}
        </div>
      ))}
      {areAllPhasesCompleted() && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleCompleteAllPhases}
          style={{ marginTop: "1rem" }}
        >
          Complete All Phases
        </Button>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Random Fact</DialogTitle>
        <DialogContent>
          <Typography>{randomFact}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
