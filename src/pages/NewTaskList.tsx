import { useReducer } from 'react'
import { ACTIONS, initialNewTaskList, newTaskListReducer } from '../reducers/NewTaskListReducer'
import CreateNewTasks from '../components/CreateNewTasks'

// export const NEW_TASK_VIEWS = {
//   CREATE: 'CreateNewTasks',
//   SELECT: 'SelectTask'
// } as const

const NewTaskList = () => {
  const [state, dispatch] = useReducer(newTaskListReducer, initialNewTaskList('CreateNewTasks'))

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      {state.currentView === 'CreateNewTasks' &&
        <CreateNewTasks onNewTaskListCreation={(newTaskList) => dispatch({
          type: ACTIONS.ADD_TASK_LIST,
          newTaskList
        })} />
      }
    </div>
  )
}

export default NewTaskList