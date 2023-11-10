import { AppData } from "../types/common.ts";

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
  ],
};
