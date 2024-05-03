import { TaskList } from './CreateNewTasksTypes';

export type NewTaskList = TaskList;

export type Task = {
  id: string;
  value: string;
  text: string;
}

export type TaskMatrix = {
  [key: string]: number;
}

export type TaskMatrixState = {
  originalTaskList: NewTaskList;
  complete: boolean;
  selected: string;
  selectedTasks: string[][];
  current: number[];
  last: number[];
  tasks: Task[];
  taskMatrix: TaskMatrix;
}