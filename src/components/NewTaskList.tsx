import { useReducer } from 'react';
import AddNewTask from './AddNewTask';
import NewTaskListInputs from './NewTaskListInputs';

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

const NewTaskList = () => {
  const [state, dispatch] = useReducer(taskInputsReducer, createInitialState(MIN_TASKS))

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-0 flex flex-col">
      <h1>Input the Competing Tasks</h1>

      <form id="newTaskList">
        <NewTaskListInputs
          tasks={state.tasks}
          minTasks={MIN_TASKS}
          handleDelete={(taskId: string) => dispatch({
            type: ACTIONS.DELETE_TASK,
            id: taskId
          })}
        />
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

      <button
        type="submit"
        form="newTaskList"
        className="mt-4 md:mt-6 w-1/2 self-center rounded-full bg-purple-300 px-10 py-2 text-lg font-bold text-purple-950 shadow-sm hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
      >
        Done
      </button>
    </div>
  )
}

export default NewTaskList