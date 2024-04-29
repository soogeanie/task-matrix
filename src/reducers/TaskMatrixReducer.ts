type TaskMatrixMap = {
  [key: number]: string;
}

export type Task = {
  id: string;
  value: string;
  text: string;
}

export const TASK_MATRIX_KEYS = {
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
  F: 'f',
  G: 'g',
  H: 'h',
  I: 'i',
  J: 'j'
} as const

export const TASK_MATRIX_MAP: TaskMatrixMap = {
  0: TASK_MATRIX_KEYS.A,
  1: TASK_MATRIX_KEYS.B,
  2: TASK_MATRIX_KEYS.C,
  3: TASK_MATRIX_KEYS.D,
  4: TASK_MATRIX_KEYS.E,
  5: TASK_MATRIX_KEYS.F,
  6: TASK_MATRIX_KEYS.G,
  7: TASK_MATRIX_KEYS.H,
  8: TASK_MATRIX_KEYS.I,
  9: TASK_MATRIX_KEYS.J
} as const

export const ACTIONS = {
  UPDATE_SELECTED: 'updateSelected',
  ADD_SELECTED: 'addSelected',
}

export const taskMatrixReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_SELECTED: {
      return {
        ...state,
        selected: action.selected
      }
    }

    case ACTIONS.ADD_SELECTED: {
      const currentCol = state.current[0]
      const currentRow = state.current[1]
      const lastIndex = state.last[1]

      let selectedTasks = [...state.selectedTasks]
      let current = [...state.current]

      const isLastStep = (currentCol === state.last[0]) && (currentRow === state.last[1])

      if (!state.selectedTasks[currentCol]) {
        selectedTasks = [...selectedTasks, [state.selected]]
      } else {
        selectedTasks[currentCol] = [...selectedTasks[currentCol], state.selected]
      }

      const taskMatrix = {
        ...state.taskMatrix,
        [state.selected]: state.taskMatrix[state.selected] + 1
      }

      if (!isLastStep) {
        if (currentRow < lastIndex) {
          current = [state.current[0], currentRow + 1]
        } else if (currentRow === lastIndex) {
          current = [currentCol + 1, currentCol + 2]
        }
      }

      const nextTasks = [{
        id: `task-${TASK_MATRIX_MAP[current[0]]}`,
        value: TASK_MATRIX_MAP[current[0]],
        text: state.originalTaskList[current[0]],
      }, {
        id: `task-${TASK_MATRIX_MAP[current[1]]}`,
        value: TASK_MATRIX_MAP[current[1]],
        text: state.originalTaskList[current[1]],
      }]

      return {
        ...state,
        complete: isLastStep,
        tasks: nextTasks,
        selected: '',
        selectedTasks,
        taskMatrix,
        current
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export const initialTaskMatrix = (newTaskList: string[]) => {
  const total = newTaskList.length
  // const currentTasks = [TASK_MATRIX_MAP[0], TASK_MATRIX_MAP[1]]

  const tasks: Task[] = [{
    id: `task-${TASK_MATRIX_MAP[0]}`,
    value: TASK_MATRIX_MAP[0],
    text: newTaskList[0]
  }, {
    id: `task-${TASK_MATRIX_MAP[1]}`,
    value: TASK_MATRIX_MAP[1],
    text: newTaskList[1]
  }]

  const taskMatrix: { [key: string]: number } = {}

  for (let i = 1; i <= newTaskList.length; i++) {
    taskMatrix[TASK_MATRIX_MAP[(i - 1)]] = 0
  }

  return {
    originalTaskList: newTaskList,
    complete: false,
    selected: '',
    selectedTasks: [],
    current: [0, 1],
    last: [total - 2, total - 1],
    tasks,
    taskMatrix
  }
}