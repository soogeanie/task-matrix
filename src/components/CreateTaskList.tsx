import { useReducer } from 'react';
import AddNewTask from './AddNewTask';
import NewTaskList from './NewTaskList';

export type TaskInput = {
  id: string;
  label: string;
  defaultValue?: string;
}

const MIN_TASKS = 3
const MAX_TASKS = 10

const ACTIONS = {
  ADD_TASK: 'addTask',
  DELETE_TASK: 'deleteTask'
}

const taskInputsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK: {
      const updatedTasks = [...state.tasks, action.newTask]

      return {
        tasks: updatedTasks,
        total: updatedTasks.length,
        next: state.next++
      }
    }

    case ACTIONS.DELETE_TASK: {
      const updatedTasks = state.tasks.filter((task: TaskInput) => task.id !== action.id)

      return {
        tasks: updatedTasks,
        total: updatedTasks.length,
        next: state.next
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
    <div className="mx-auto max-w-2xl px-4 sm:px-0">
      <h1>Input the Competing Tasks</h1>
      
      <NewTaskList
        tasks={state.tasks}
        minTasks={MIN_TASKS}
        handleDelete={(taskId: string) => dispatch({
          type: ACTIONS.DELETE_TASK,
          id: taskId
        })}
      />

      {state.total !== MAX_TASKS && 
        <AddNewTask
          nextInput={state.next}
          handleNewTask={(newTask: TaskInput) => dispatch({
            type: ACTIONS.ADD_TASK,
            newTask
          })}
        />
      }
    </div>
  )
}

export default CreateTaskList