import { useState } from 'react'

import type { TaskList } from '../types/CreateNewTasksTypes'

import CreateNewTasks from '../components/CreateNewTasks'
import TaskMatrix from '../components/TaskMatrix'

const NEW_TASK_VIEWS = {
  CREATE: 'CreateNewTasks',
  SELECT: 'TaskMatrix'
} as const

// eventually tbd: handle when there is an existing newTaskList in locale storage better than this???
const EXISTING_NEW_TASK_LIST = JSON.parse(localStorage.getItem('newTaskList'))
const DEFAULT_NEW_TASK_LIST = EXISTING_NEW_TASK_LIST || []
const DEFAULT_CURRENT_VIEW = DEFAULT_NEW_TASK_LIST.length > 0 ? NEW_TASK_VIEWS.SELECT : NEW_TASK_VIEWS.CREATE

const NewTaskList = () => {
  const [currentView, setCurrentView] = useState(DEFAULT_CURRENT_VIEW)
  const [newTaskList, setNewTaskList] = useState(DEFAULT_NEW_TASK_LIST)

  const handleNewTaskListCreation = (newTaskList: TaskList) => {
    // tbd: handle when newTaskList is empty
    setNewTaskList(newTaskList)
    setCurrentView(NEW_TASK_VIEWS.SELECT)
  }

  return (
    <main className="mx-auto max-w-2xl px-4 pb-12 pt-10 lg:pb-16">
      {currentView === NEW_TASK_VIEWS.SELECT ?
        <TaskMatrix newTaskList={newTaskList} />
      :
        <CreateNewTasks onNewTaskListCreation={(newTaskList) => handleNewTaskListCreation(newTaskList) } />
      }
    </main>
  )
}

export default NewTaskList