import React, { useEffect, useMemo, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  styled,
  Typography,
  Pagination as MuiPagination,
} from "@mui/material";
import { AppData } from "../../types/common";
import { initialData } from "../../seeds/seed";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import NumberBadge from "../../components/NumberBadge/NumberBadge";
import {
  PhaseContainer,
  PhaseHeaderContainer,
  PhaseHeaderTitleContainer,
} from "./Home.styled";
import StyledPaper from "../../components/Paper/Paper";
import { motion } from "framer-motion";
import ReactConfetti from "react-confetti";

const Pagination = styled(MuiPagination)`
  margin-top: 3rem;
  ul {
    display: flex;
    place-content: center;
  }
`;

const Home: React.FC = () => {
  const [appData, setAppData] = useState<AppData>(initialData);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [randomFact, setRandomFact] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 3;

  const areAllPhasesCompleted = useMemo(
    () =>
      appData.phases.every((phase) =>
        phase.tasks.every((task) => task.completed),
      ),
    [appData.phases],
  );

  useEffect(() => {
    const storedData = localStorage.getItem("appData");
    if (storedData) {
      setAppData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (areAllPhasesCompleted) {
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
  }, [areAllPhasesCompleted]);

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

  const saveToLocalStorage = (data: AppData) => {
    localStorage.setItem("appData", JSON.stringify(data));
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

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
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
      {appData.phases
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((phase, phaseIndex) => (
          <PhaseContainer key={phase.id}>
            <PhaseHeaderContainer $canUndoPhase={canUndoPhase(phaseIndex)}>
              <PhaseHeaderTitleContainer>
                <NumberBadge count={phaseIndex + 1} />
                <Typography variant="h4">{phase.name}</Typography>
              </PhaseHeaderTitleContainer>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: canUndoPhase(phaseIndex) ? 2 : 1 }}
                whileTap={{ scale: canUndoPhase(phaseIndex) ? 0.5 : 1 }}
              >
                <Typography
                  variant="h4"
                  onClick={() => {
                    if (canUndoPhase(phaseIndex)) handleUndo(phaseIndex);
                  }}
                >
                  {phase.tasks.every((task) => task.completed) && " ✔"}
                </Typography>
              </motion.div>
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

      <Pagination
        count={Math.ceil(appData.phases.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
      />

      {openDialog && (
        <>
          <ReactConfetti />
          <ModalDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            title={"Congratulations! 🥳🎉"}
            content={randomFact ?? "Sorry, we couldn't find a random fact."}
          />
        </>
      )}
    </StyledPaper>
  );
};

export default Home;
