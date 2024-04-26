import { useReducer } from 'react'

import { ACTIONS, createNewTasksReducer, initialCreateNewTasks } from '../reducers/CreateNewTasksReducer';

import CreateNewTasksForm from './CreateNewTasksForm'
import AddNewTask from './AddNewTask';
import Button from './Button/Button';
import PageHeader from './PageHeader';

export type NewTaskInput = {
  id: string;
  label: string;
  defaultValue: string;
  hasValue: boolean;
  hasError: boolean;
}

type CreateNewTasksProps = {
  onNewTaskListCreation: (newTaskList: string[]) => void;
}

const MIN_TASKS = 3
const MAX_TASKS = 10

const CreateNewTasks = ({ onNewTaskListCreation }: CreateNewTasksProps) => {
  const [state, dispatch] = useReducer(createNewTasksReducer, initialCreateNewTasks(MIN_TASKS))

  const handleTaskInputUpdates = (type, task) => {
    dispatch({ type, task })

    dispatch({ type: ACTIONS.UPDATE_SUBMIT_BUTTON })
  }

   const validateForm = (formInputIds: string[]) => {
    let isValid = true

    for (const inputId of formInputIds) {
      const input = document.getElementById(inputId) as HTMLInputElement

      isValid = input.validity.valid

      dispatch({
        type: ACTIONS.UPDATE_ERROR,
        taskId: input.id,
        hasError: !input.validity.valid
      })
    }

    return isValid
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch({
      type: ACTIONS.UPDATE_SUBMIT_BUTTON,
      enableSubmitButton: false
    })

    const formData = new FormData(event.currentTarget)
    const isValidForm = await validateForm([...formData.keys()])

    if (isValidForm) {
      const results = [...formData.values()]

      // tbd: create a custom hook for this
      localStorage.setItem('newTaskList', JSON.stringify(results))

      onNewTaskListCreation(results)
    }
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="New Task"
        description="Add the competing tasks. Up to 10 tasks because more than that is too much."
      />

      <CreateNewTasksForm
        tasks={state.tasks}
        minTasks={MIN_TASKS}
        validForm={state.validForm}
        onInputUpdate={(updatedTask: NewTaskInput) => handleTaskInputUpdates(ACTIONS.UPDATE_TASK, updatedTask )}
        onInputDelete={(task: NewTaskInput) => handleTaskInputUpdates(ACTIONS.DELETE_TASK, task)}
        onFormSubmit={(event) => handleFormSubmit(event)}
      />

      {state.total !== MAX_TASKS &&
        <AddNewTask
          newTask={state.newTask}
          addNewTask={(task: NewTaskInput) => handleTaskInputUpdates(ACTIONS.ADD_TASK, task)}
        />
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

export default CreateNewTasks