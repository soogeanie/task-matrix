import { useReducer } from 'react'

import NewTaskListForm from './NewTaskListForm'
import AddNewTask from './AddNewTask';
import Button from './Button/Button';

export type TaskInput = {
  id: string;
  label: string;
  defaultValue: string;
  hasValue: boolean;
  hasError: boolean;
}

export type InputUpdateProps = {
  inputId: string;
  validityState: ValidityState;
}

const MIN_TASKS = 3
const MAX_TASKS = 10

const ACTIONS = {
  ADD_TASK: 'addTask',
  DELETE_TASK: 'deleteTask',
  UPDATE_TASK: 'updateTask',
  UPDATE_SUBMIT_BUTTON: 'updateSubmitButton',
  UPDATE_ERROR: 'updateError'
}

const newTaskListReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK: {
      const nextTask = state.next++

      const updatedTasks = [...state.tasks, action.task]

      return {
        ...state,
        tasks: updatedTasks,
        total: updatedTasks.length,
        next: nextTask,
        nextTask: {
          id: `task-input-${nextTask}`,
          label: `Task Input ${nextTask}`,
          defaultValue: ''
        }
      }
    }

    case ACTIONS.DELETE_TASK: {
      const updatedTasks = state.tasks.filter((task: TaskInput) => task.id !== action.task.id)

      return {
        ...state,
        tasks: updatedTasks,
        total: updatedTasks.length
      }
    }

    case ACTIONS.UPDATE_TASK: {
      const updatedTasks = state.tasks.map((task: TaskInput) => {
        if (task.id !== action.task.id) return task

        return { ...task, ...action.task }
      })

      return {
        ...state,
        tasks: updatedTasks
      }
    }

    case ACTIONS.UPDATE_ERROR: {
      const updatedTasks = state.tasks.map((task: TaskInput) => {
        if (task.id !== action.taskId) return task

        return { ...task, hasError: action.hasError }
      })

      const isValidForm = updatedTasks.every((task: TaskInput) => !task.hasError)

      return {
        ...state,
        tasks: updatedTasks,
        validForm: isValidForm,
        enableSubmitButton: isValidForm
      }
    }

    case ACTIONS.UPDATE_SUBMIT_BUTTON: {
      const enableSubmitButton = action.enableSubmitButton
        ? action.enableSubmitButton
        : state.tasks.every((task: TaskInput) => task.hasValue)

      return {
        ...state,
        enableSubmitButton: enableSubmitButton
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

const createInitialState = (minTasks: number) => {
  const initialTasks: TaskInput[] = []
  const nextTask = minTasks + 1

  for (let i = 1; i <= minTasks; i++) {
    initialTasks.push({
      id: `task-input-${i}`,
      label: `Task Input ${i}`,
      defaultValue: '',
      hasValue: false,
      hasError: false
    })
  }

  return {
    tasks: initialTasks,
    total: minTasks,
    next: nextTask,
    newTask: {
      id: `task-input-${nextTask}`,
      label: `Task Input ${nextTask}`,
      defaultValue: '',
      hasError: false
    },
    enableSubmitButton: false,
    validForm: true
  }
}

const NewTaskList = () => {
  const [state, dispatch] = useReducer(newTaskListReducer, createInitialState(MIN_TASKS))

  const handleTaskInputUpdates = (type, task) => {
    dispatch({ type, task })

    dispatch({ type: ACTIONS.UPDATE_SUBMIT_BUTTON })
  }

   const validateForm = (formInputIds: string[]) => {
    for (const inputId of formInputIds) {
      const input = document.getElementById(inputId) as HTMLInputElement

      dispatch({
        type: ACTIONS.UPDATE_ERROR,
        taskId: input.id,
        hasError: !input.validity.valid
      })
    }
   }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('form submitted')

    dispatch({
      type: ACTIONS.UPDATE_SUBMIT_BUTTON,
      enableSubmitButton: false
    })

    const formData = new FormData(event.currentTarget)
    await validateForm([...formData.keys()])
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-0 flex flex-col">
      <h1>Input the Competing Tasks</h1>

      <NewTaskListForm
        tasks={state.tasks}
        minTasks={MIN_TASKS}
        validForm={state.validForm}
        onInputUpdate={(updatedTask: TaskInput) => handleTaskInputUpdates(ACTIONS.UPDATE_TASK, updatedTask )}
        onInputDelete={(task: TaskInput) => handleTaskInputUpdates(ACTIONS.DELETE_TASK, task)}
        onFormSubmit={(event) => handleFormSubmit(event)}
      />

      {state.total !== MAX_TASKS &&
        <AddNewTask newTask={state.newTask} addNewTask={(task: TaskInput) => handleTaskInputUpdates(ACTIONS.ADD_TASK, task)} />
      }

      <Button
        type="submit"
        form="newTaskList"
        className="mt-4 md:mt-6 w-1/2 self-center"
        disabled={!state.enableSubmitButton}
        handleOnClick={() => handleFormSubmit}
      >
        Done
      </Button>
    </div>
  )
}

export default NewTaskList