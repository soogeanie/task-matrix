export type Actions = 'addTask' | 'deleteTask' | 'updateTask' | 'updateSubmitButton' | 'updateError'

export type NewTaskInput = {
  id: string;
  label: string;
  defaultValue: string;
  hasValue: boolean;
  hasError: boolean;
}

export type NewTaskInputList = NewTaskInput[];

export type TaskList = string[];

export type MinTask = number;

export type MaxTask = number;

export type CreateNewTasksState = {
  tasks: NewTaskInputList;
  total: number;
  next: number;
  newTask: Omit<NewTaskInput, 'hasValue'>;
  enableSubmitButton: boolean;
  validForm: boolean;
}