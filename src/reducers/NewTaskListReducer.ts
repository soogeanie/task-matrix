export const ACTIONS = {
  ADD_TASK_LIST: 'addNewTaskList'
}

export const newTaskListReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK_LIST: {
      return { ...state, newTasks: action.newTaskList }
    }
  }

  throw Error(`Unknown action: ${action.type}`)
}

export const initialNewTaskList = (view: string) => {
  return {
    newTasks: {},
    currentView: view,
    views: ['CreateNewTasks', 'SelectTasks']
  }
}