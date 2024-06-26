import { useEffect, useReducer } from 'react';

import type { NewTaskList, TaskMatrix, TaskMatrixState } from '../types/TaskMatrixTypes';

import { ACTIONS, TASK_MATRIX_KEYS, TASK_MATRIX_MAP, initialTaskMatrix, taskMatrixReducer } from '../reducers/TaskMatrixReducer';

import PageHeader from './PageHeader';
import TaskPicker from './TaskPicker';
import Button from './Button/Button';

import { checkIfArrayIsUnique } from '../utils';

type TaskMatrixProps = {
  newTaskList: NewTaskList;
}

type CalculateTaskMatrixProps = Pick<TaskMatrixState, 'selectedTasks' | 'last'> & {
  initialTaskMatrix: TaskMatrixState['taskMatrix'];
}

type SortTasksProps = Pick<TaskMatrixState, 'taskMatrix'> & {
  taskList: TaskMatrixState['originalTaskList'];
}

const TASK_MATRIX_INDICES: TaskMatrix = {
  [TASK_MATRIX_KEYS.A]: 0,
  [TASK_MATRIX_KEYS.B]: 1,
  [TASK_MATRIX_KEYS.C]: 2,
  [TASK_MATRIX_KEYS.D]: 3,
  [TASK_MATRIX_KEYS.E]: 4,
  [TASK_MATRIX_KEYS.F]: 5,
  [TASK_MATRIX_KEYS.G]: 6,
  [TASK_MATRIX_KEYS.H]: 7,
  [TASK_MATRIX_KEYS.I]: 8,
  [TASK_MATRIX_KEYS.J]: 9
} as const

const calculateTaskMatrix = async ({
  initialTaskMatrix,
  selectedTasks,
  last
}: CalculateTaskMatrixProps) => {
  let taskMatrix = { ...initialTaskMatrix }

  const keys = Object.keys(taskMatrix)
  const totalKeys = keys.length

  let left = 0
  let right = 1

  while (left < (totalKeys - 1)) {
    if (taskMatrix[TASK_MATRIX_MAP[left]] === taskMatrix[TASK_MATRIX_MAP[right]]) {

      const selectedValues = selectedTasks[left]
      const arrayIndex = (right - left) - 1
      const selected = selectedValues[arrayIndex]
      const newValue = taskMatrix[selected] + 1

      taskMatrix = {
        ...taskMatrix,
        [selected]: newValue
      }
    }

    if (right === last[1]) {
      left++
      right = left + 1
    } else {
      right++
    }
  }

  const hasDuplicates = await !checkIfArrayIsUnique(Object.values(taskMatrix))

  if (hasDuplicates) {
    return calculateTaskMatrix({
      initialTaskMatrix: taskMatrix,
      selectedTasks,
      last
    })
  }

  return taskMatrix
}

const sortTasks = ({ taskList, taskMatrix }: SortTasksProps) => {
  return Object.entries(taskMatrix)
    .sort((a, b) => {
      return b[1] - a[1]
    })
    .map((taskMatrix) => {
      const key = TASK_MATRIX_INDICES[taskMatrix[0]]
      return taskList[key]
    })
}

const getPrioritizedTasks = async (state: TaskMatrixState) => {
  const localStorageResults = JSON.parse(localStorage.getItem('taskPicker'))
  const results = localStorageResults.selectedTasks.length > 0 ? localStorageResults : state

  const { taskMatrix, selectedTasks, originalTaskList, last } = results

  if (checkIfArrayIsUnique(Object.values(taskMatrix))) {
    return taskMatrix
  }

  const updatedTaskMatrix = await calculateTaskMatrix({
    initialTaskMatrix: taskMatrix,
    selectedTasks,
    last
  })

  localStorage.setItem('taskMatrix', JSON.stringify(updatedTaskMatrix))

  const sortedTaskList = await sortTasks({
    taskList: originalTaskList,
    taskMatrix: updatedTaskMatrix
  })

  localStorage.setItem('sortedTaskList', JSON.stringify(sortedTaskList))
}

const TaskMatrix = ({ newTaskList }: TaskMatrixProps) => {
  // todo: add functionality that checks to see if there is an existing taskPicker in local storage
  // so user can pick up where they left off
  // * it might be time to split this up into more components or move a lot of code above out into utils or helper files
  const [state, dispatch] = useReducer(taskMatrixReducer, initialTaskMatrix(newTaskList))

  const handleNextButton = () => {
    // this shouldn't be possible but just in case
    // if (!state.selected.length) throw an error

    const input = document.querySelector('input[name="task-selector"]:checked') as HTMLInputElement

    dispatch({ type: ACTIONS.ADD_SELECTED })

    input.checked = false
  }

  // when submitting and state.complete is true
  // add necessary information to locale storage in order to change the view 

  useEffect(() => {
    if (state.selectedTasks.length) {
      localStorage.setItem('taskPicker', JSON.stringify({...state}))
    }

    if (state.complete) {
      getPrioritizedTasks(state)
    }
  }, [state])

  return (
    <div>
      <PageHeader
        title="Task Picker"
        description="Pick which task is more important, a priority, needs to get done between, or whatever your criteria is."
      />

      {/* todo: add transition or something for when all tasks are selected so you don't see the last task selector */}
      {!state.complete &&
        <fieldset className="mt-8 flex flex-col gap-4">
          <legend className="text-base font-semibold leading-6 text-gray-900">Pick a task</legend>

          <TaskPicker
            tasks={state.tasks}
            handleOnChange={(selectedValue: string) => dispatch({
              type: ACTIONS.UPDATE_SELECTED,
              selected: selectedValue
            })}
          />

          {!!state.selected && !state.complete &&
            <Button handleOnClick={() => handleNextButton()}>
              Next
            </Button>
          }
        </fieldset>
      }
    </div>
  )
}

export default TaskMatrix