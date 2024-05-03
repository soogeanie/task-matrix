import { useReducer } from 'react'

import type { Actions, MaxTask, MinTask, NewTaskInput, TaskList } from '../types/CreateNewTasksTypes';

import { ACTIONS, createNewTasksReducer, initialCreateNewTasks } from '../reducers/CreateNewTasksReducer';

import CreateNewTasksForm from './CreateNewTasksForm'
import AddNewTask from './AddNewTask';
import Button from './Button/Button';
import PageHeader from './PageHeader';


type CreateNewTasksProps = {
  onNewTaskListCreation: (newTaskList: TaskList) => void;
}

type FormInputIds = Array<NewTaskInput['id']>;

const MIN_TASKS: MinTask = 3
const MAX_TASKS: MaxTask= 10

const CreateNewTasks = ({ onNewTaskListCreation }: CreateNewTasksProps) => {
  const [state, dispatch] = useReducer(createNewTasksReducer, initialCreateNewTasks(MIN_TASKS))

  const handleTaskUpdate = (action: Actions, task: NewTaskInput) => {
    dispatch({
      type: action,
      task
    })

    dispatch({ type: ACTIONS.UPDATE_SUBMIT_BUTTON })
  }

  const validateForm = (formInputIds: FormInputIds) => {
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
      const results = [...formData.values()] as TaskList

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
        onChangeTask={(task: NewTaskInput) => handleTaskUpdate(ACTIONS.UPDATE_TASK, task)}
        onDeleteTask={(task: NewTaskInput) => handleTaskUpdate(ACTIONS.DELETE_TASK, task)}
        onFormSubmit={(event) => handleFormSubmit(event)}
      />

      {/* todo: if there is a task in the addTask input, ask user before submitting form */}
      {state.total !== MAX_TASKS &&
        <AddNewTask
          newTask={state.newTask}
          onAddTask={(task: NewTaskInput) => handleTaskUpdate(ACTIONS.ADD_TASK, task)}
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