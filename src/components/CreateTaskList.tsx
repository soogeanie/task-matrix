import { useReducer } from 'react'
import InputText from './InputText'

type NewTask = {
  id: number;
  text: string;
}

const MIN_TASKS = 3
// const MAX_TASKS = 10

const ACTIONS = {
  ADD_TASK: 'addTask',
  UPDATE_TASK: 'updateTask'
}

const tasksReducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.UPDATE_TASK: {
      const updatedTasks = state.tasks.map((task: NewTask) => {
        if (task.id === action.id) {
          return {
            id: task.id,
            text: action.text
          }
        }

        return task
      })

      return {
        ...state,
        tasks: updatedTasks
      }
    }

    case ACTIONS.ADD_TASK: {
      return {
        tasks: [...state.tasks, {
          id: action.id,
          text: action.text
        }],
        total: state.total++
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

const createInitialState = (minTasks: number) => {
  const intialTasks: NewTask[] = []

  for (let i = 1; i <= minTasks; i++) {
    intialTasks.push({
      id: i,
      text: ''
    })
  }

  return {
    tasks: intialTasks,
    total: 3
  }
}

const CreateTaskList = () => {
  const [state, dispatch] = useReducer(tasksReducer, createInitialState(MIN_TASKS))

  return (
    <>
      <h1>Input the Competing Tasks</h1>

      <form>
        {state.tasks.map((task: NewTask) => (
          <InputText
            key={`task-input-${task.id}`}
            id={`task-input-${task.id}`}
            label={`Task Input ${task.id}`}
            placeholder='New Task'
            onBlur={(inputValue) => dispatch({
              type: ACTIONS.UPDATE_TASK,
              id: task.id,
              text: inputValue
            })}
          />
        ))}
      </form>
    </>
  )
}

export default CreateTaskList