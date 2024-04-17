import { useReducer } from 'react';
import InputText from './InputText';
import AddNewTask from './AddNewTask';

export type TaskInput = {
  id: string;
  label: string;
  defaultValue?: string;
}

const MIN_TASKS = 3
const MAX_TASKS = 10

const ACTIONS = {
  ADD_TASK: 'addTask'
}

const taskInputsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK: {
      return {
        tasks: [...state.tasks, action.newTask],
        total: state.total++,
        next: state.total + 2
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

const createInitialState = (minTasks: number) => {
  const initialTasks: TaskInput[] = []

  for (let i = 1; i <= minTasks; i++) {
    initialTasks.push({
      id: `task-input-${i}`,
      label: `Task Input ${i}`,
      defaultValue: ''
    })
  }

  return {
    tasks: initialTasks,
    total: minTasks,
    next: minTasks + 1,
  }
}

const CreateTaskList = () => {
  const [state, dispatch] = useReducer(taskInputsReducer, createInitialState(MIN_TASKS))

  return (
    <>
      <h1>Input the Competing Tasks</h1>

      <form>
        {state.tasks.map((task: TaskInput) => (
          <InputText
            key={task.id}
            {...task}
            placeholder='New Task'
          />
        ))}
      </form>

      {state.total !== MAX_TASKS && 
        <AddNewTask
          nextInput={state.next}
          handleNewTask={(newTask: TaskInput) => dispatch({
            type: ACTIONS.ADD_TASK,
            newTask
          })}
        />
      }
    </>
  )
}

export default CreateTaskList