import { useReducer } from 'react';
import NewTaskListInputs from './NewTaskListInputs';
import AddNewTask from './AddNewTask';

export type TaskInput = {
  id: string;
  label: string;
  defaultValue: string;
  hasValue: boolean;
}

type UpdateTaskProps = {
  type: string;
  task: TaskInput;
}

const MIN_TASKS = 3
const MAX_TASKS = 10

const ACTIONS = {
  ADD_TASK: 'addTask',
  DELETE_TASK: 'deleteTask',
  UPDATE_TASK: 'updateTask',
  UPDATE_VALIDITY: 'updateValidity'
}

const taskInputsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK: {
      const { id, label, defaultValue, hasValue } = action

      const updatedTasks = [...state.tasks, { id, label, defaultValue, hasValue }]

      return {
        ...state,
        tasks: updatedTasks,
        total: updatedTasks.length,
        next: state.next++
      }
    }

    case ACTIONS.DELETE_TASK: {
      const updatedTasks = state.tasks.filter((task: TaskInput) => task.id !== action.id)

      return {
        ...state,
        tasks: updatedTasks,
        total: updatedTasks.length
      }
    }

    case ACTIONS.UPDATE_TASK: {
      const updatedTasks = state.tasks.map((task: TaskInput) => {
        if (task.id !== action.id) return task

        return { ...task, hasValue: action.hasValue }
      })

      return {
        ...state,
        tasks: updatedTasks
      }
    }

    case ACTIONS.UPDATE_VALIDITY: {
      return {
        ...state,
        validForm: state.tasks.every((task: TaskInput) => task.hasValue)
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
      defaultValue: '',
      hasValue: false
    })
  }

  return {
    tasks: initialTasks,
    total: minTasks,
    next: minTasks + 1,
    validForm: false
  }
}

const NewTaskList = () => {
  const [state, dispatch] = useReducer(taskInputsReducer, createInitialState(MIN_TASKS))

  const updateTasks = ({ type, task }: UpdateTaskProps) => {
    dispatch({ type, ...task })

    dispatch({ type: ACTIONS.UPDATE_VALIDITY })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    console.log('submitted')

    const formData = new FormData(event.currentTarget)
    const values = Array.from(formData.values())

    for (const value of formData.values()) {
      console.log(value);
    }

    console.log(values)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-0 flex flex-col">
      <h1>Input the Competing Tasks</h1>

      <form id="newTaskList" onSubmit={handleFormSubmit}>
        <NewTaskListInputs
          tasks={state.tasks}
          minTasks={MIN_TASKS}
          handleDelete={(task: TaskInput) => updateTasks({ type: ACTIONS.DELETE_TASK, task })}
          handleInputUpdate={(task: TaskInput) => updateTasks({ type: ACTIONS.UPDATE_TASK, task })}
        />
      </form>

      {state.total !== MAX_TASKS && 
        <AddNewTask
          nextInput={state.next}
          handleNewTask={(task: TaskInput) => updateTasks({ type: ACTIONS.ADD_TASK, task })}
        />
      }

      <button
        type="submit"
        form="newTaskList"
        className="mt-4 md:mt-6 w-1/2 self-center rounded-full bg-purple-300 px-10 py-2 text-lg font-bold text-purple-950 shadow-sm hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 disabled:bg-gray-200 disabled:text-gray-400"
        disabled={!state.validForm}
      >
        Done
      </button>
    </div>
  )
}

export default NewTaskList