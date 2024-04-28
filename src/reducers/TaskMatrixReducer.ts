type TaskMatrixMap = {
  [key: number]: string;
}

export type currentTask = {
  id: string;
  value: string;
  text: string;
}

const TASK_MATRIX_KEYS = {
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
  UPDATE_CHECKED: 'updateChecked',
  ADD_SELECTED_TASK: 'addSelectedTask',
}

export const taskMatrixReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CHECKED: {
      return {
        ...state,
        checked: action.checked
      }
    }

    case ACTIONS.ADD_SELECTED_TASK: {
      const currentColumn = state.current[0]
      const currentRow = state.current[1]

      const updatedCurrent = [...state.current]

      if (currentRow < (state.total - 1)) {
        updatedCurrent[1] = currentRow + 1
      } else if (currentRow === (state.total - 1)) {
        updatedCurrent[0] = currentColumn + 1
        updatedCurrent[1] = currentColumn + 2
      }

      const updatedSelectedTasks = [...state.selectedTasks]

      if (!state.selectedTasks[currentColumn]) {
        updatedSelectedTasks.push([state.checked])
        console.log('no existing column', updatedSelectedTasks)
      } else {
        updatedSelectedTasks[currentColumn].push(state.checked)
        console.log('has existing column', updatedSelectedTasks)
      }

      const updatedCurrentTasks = [{
        id: `task-${TASK_MATRIX_MAP[updatedCurrent[0]]}`,
        value: TASK_MATRIX_MAP[updatedCurrent[0]],
        text: state.unprioritized[updatedCurrent[0]],
      }, {
        id: `task-${TASK_MATRIX_MAP[updatedCurrent[1]]}`,
        value: TASK_MATRIX_MAP[updatedCurrent[1]],
        text: state.unprioritized[updatedCurrent[1]],
      }]

      const tracker = {
        ...state.tracker,
        [TASK_MATRIX_MAP[currentColumn]]: state.tracker[TASK_MATRIX_MAP[currentColumn]] + 1
      }

      console.log({ currentColumn, currentRow, updatedCurrent, tracker })

      return {
        ...state,
        checked: '',
        selectedTasks: updatedSelectedTasks,
        current: updatedCurrent,
        currentTasks: updatedCurrentTasks,
        tracker
      }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export const initialTaskMatrix = (newTaskList: string[]) => {
  const currentTasks: currentTask[] = [{
    id: `task-${TASK_MATRIX_MAP[0]}`,
    value: TASK_MATRIX_MAP[0],
    text: newTaskList[0]
  }, {
    id: `task-${TASK_MATRIX_MAP[1]}`,
    value: TASK_MATRIX_MAP[1],
    text: newTaskList[1]
  }]

  const tracker: { [key: string]: number } = {}

  for (let i = 1; i <= newTaskList.length; i++) {
    tracker[TASK_MATRIX_MAP[(i - 1)]] = 0
  }

  return {
    unprioritized: newTaskList,
    total: newTaskList.length,
    selectedTasks: [],
    checked: '',
    current: [0 , 1],
    currentTasks,
    tracker
  }
}