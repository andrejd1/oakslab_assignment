import { AppData } from "../types/common.ts";

// Function to generate more phases
function generateMorePhases() {
  let newPhases = [];
  for (let i = 4; i <= 103; i++) {
    let newPhase = {
      id: i,
      name: "Phase " + i,
      tasks: [
        { id: i*2 - 1, description: "Task " + (i*2 - 1), completed: false },
        { id: i*2, description: "Task " + i*2, completed: false },
      ],
    };
    newPhases.push(newPhase);
  }
  return newPhases;
}

export const initialData: AppData = {
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
    ...generateMorePhases(),
  ],
};
