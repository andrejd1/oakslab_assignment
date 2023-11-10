import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { AppData } from "../../types/common";
import { initialData } from "../../seeds/seed";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import NumberBadge from "../../components/NumberBadge/NumberBadge";
import {
  PhaseContainer,
  PhaseHeaderContainer,
  PhaseHeaderTitleContainer,
} from "./Home.styled";
import StyledPaper from "../../components/Paper/Paper.tsx";

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

  useEffect(() => {
    const areAllPhasesCompleted = () => {
      return appData.phases.every((phase) =>
        phase.tasks.every((task) => task.completed),
      );
    };

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
  }, [appData]);

  const canMarkTask = (phaseIndex: number, taskIndex: number) => {
    const currentPhase = appData.phases[phaseIndex];
    const previousPhase = appData.phases[phaseIndex - 1];

    if (phaseIndex === 0) {
      return (
        taskIndex < appData.phases[phaseIndex].tasks.length &&
        !currentPhase.tasks.every((task) => task.completed)
      );
    }

    // Check if all tasks in the previous phase are completed
    if (!previousPhase.tasks.every((task) => task.completed)) {
      return false;
    }

    // Check if all tasks in the current phase are completed
    if (currentPhase.tasks.every((task) => task.completed)) {
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

  const handleUndo = (phaseIndex: number) => {
    const updatedData: AppData = {
      ...appData,
      phases: appData.phases.map((phase, idx) => {
        if (idx === phaseIndex) {
          const updatedTasks = phase.tasks.map((task) => ({
            ...task,
            completed: false,
          }));
          return { ...phase, tasks: updatedTasks };
        }
        return phase;
      }),
    };

    setAppData(updatedData);
    saveToLocalStorage(updatedData);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRandomFact(null);
  };

  const canUndoPhase = (phaseIndex: number) => {
    const previousPhases = appData.phases.slice(0, phaseIndex);
    const nextPhases = appData.phases.slice(phaseIndex + 1);

    // Check if all previous phases are completed and no next phases are completed
    return (
      previousPhases.every((phase) =>
        phase.tasks.every((task) => task.completed),
      ) &&
      !nextPhases.some((phase) => phase.tasks.some((task) => task.completed))
    );
  };

  return (
    <StyledPaper>
      <Typography variant="h3">{appData.title}</Typography>
      {appData.phases.map((phase, phaseIndex) => (
        <PhaseContainer key={phase.id}>
          <PhaseHeaderContainer $canUndoPhase={canUndoPhase(phaseIndex)}>
            <PhaseHeaderTitleContainer>
              <NumberBadge count={phaseIndex + 1} />
              <Typography variant="h4">{phase.name}</Typography>
            </PhaseHeaderTitleContainer>
            <Typography
              variant="h3"
              // color="steelblue"
              onClick={() => {
                if (canUndoPhase(phaseIndex)) handleUndo(phaseIndex);
              }}
            >
              {phase.tasks.every((task) => task.completed) && " ✔"}
            </Typography>
          </PhaseHeaderContainer>
          {phase.tasks.map((task, taskIndex) => (
            <FormControlLabel
              key={task.id}
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
          ))}
        </PhaseContainer>
      ))}
      <ModalDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        title={"Congratulations! 🥳🎉"}
        content={randomFact ?? "Sorry, we couldn't find a random fact."}
      />
    </StyledPaper>
  );
};

export default Home;
