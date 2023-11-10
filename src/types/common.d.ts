import React, { CSSProperties } from "react";

export type Task = {
  id: number;
  description: string;
  completed: boolean;
};

export type Phase = {
  id: number;
  name: string;
  tasks: Task[];
};

export type AppData = {
  title: string;
  phases: Phase[];
};

export type CustomStyledComponentProps = {
  children: React.ReactNode;
  style?: CSSProperties;
};
