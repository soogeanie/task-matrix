import { useReducer } from 'react';
import InputGroup from './InputGroup';
import InputText from './InputText';
import AddNewTask from './AddNewTask';
import MinusCircleIcon from './Icons/MinusCircleIcon';

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
    <div className="mx-auto max-w-2xl px-4 sm:px-0">
      <h1>Input the Competing Tasks</h1>

      <form>
        {state.tasks.map((task: TaskInput) => (
          <InputGroup key={task.id}>
            <InputText
              placeholder='New Task'
              {...task}
            />

            {state.total > MIN_TASKS ?
              <button type="button">
                <MinusCircleIcon className="h-10 w-10 text-red-700" />
                <span className="sr-only">{`Delete ${task.label}`}</span>
              </button>
            :
              <div className="w-11 ml-1"></div>
            }
          </InputGroup>
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
    </div>
  )
}

export default CreateTaskList