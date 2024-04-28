type TaskMatrixMap = {
  [key: string]: number;
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

export const taskMatrixReducer = (state, action) => {
  return state

  throw Error(`Unknown action: ${action.type}`)
}

export const initialTaskMatrix = (newTaskList: string[]) => {
  const position = ['a', 'b']
  const current = [newTaskList[TASK_MATRIX_MAP[position[0]]], newTaskList[TASK_MATRIX_MAP[position[1]]]]

  const selectedTasks = []
  const tracker: {[key: string]: number} = {}

  for (let i = 1; i <= newTaskList.length; i++) {
    selectedTasks.push([])

    const taskMatrixKey = Object.keys(TASK_MATRIX_MAP).find((key) => TASK_MATRIX_MAP[key] === i)

    if (taskMatrixKey) tracker[taskMatrixKey] = 0
  }

  return {
    unprioritized: newTaskList,
    selectedTasks,
    tracker,
    current,
    position
  }
}
