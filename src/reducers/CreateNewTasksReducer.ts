import { NewTaskInput } from '../components/CreateNewTasks'

export const ACTIONS = {
  ADD_TASK: 'addTask',
  DELETE_TASK: 'deleteTask',
  UPDATE_TASK: 'updateTask',
  UPDATE_SUBMIT_BUTTON: 'updateSubmitButton',
  UPDATE_ERROR: 'updateError'
}

export const createNewTasksReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK: {
      const nextTask = state.next++

      const updatedTasks = [...state.tasks, action.task]

      return {
        ...state,
        tasks: updatedTasks,
        total: updatedTasks.length,
        next: nextTask,
        newTask: {
          id: `task-input-${nextTask}`,
          label: `Task Input ${nextTask}`,
          defaultValue: ''
        }
      }
    }

    case ACTIONS.DELETE_TASK: {
      const updatedTasks = state.tasks.filter((task: NewTaskInput) => task.id !== action.task.id)

      return {
        ...state,
        tasks: updatedTasks,
        total: updatedTasks.length
      }
    }

    case ACTIONS.UPDATE_TASK: {
      const updatedTasks = state.tasks.map((task: NewTaskInput) => {
        if (task.id !== action.task.id) return task

        return { ...task, ...action.task }
      })

      return {
        ...state,
        tasks: updatedTasks
      }
    }

    case ACTIONS.UPDATE_ERROR: {
      const updatedTasks = state.tasks.map((task: NewTaskInput) => {
        if (task.id !== action.taskId) return task

        return { ...task, hasError: action.hasError }
      })

      const isValidForm = updatedTasks.every((task: NewTaskInput) => !task.hasError)

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
        : state.tasks.every((task: NewTaskInput) => task.hasValue)

      return {
        ...state,
        enableSubmitButton: enableSubmitButton
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export const initialCreateNewTasks = (minTasks: number) => {
  const initialTasks: NewTaskInput[] = []
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
