import { useReducer } from 'react';

import { initialTaskMatrix, taskMatrixReducer } from '../reducers/TaskMatrixReducer';

import PageHeader from './PageHeader';
import TaskSelector from './TaskSelector';

type TaskMatrixProps = {
  newTaskList: string[];
}

const TaskMatrix = ({ newTaskList }: TaskMatrixProps) => {
  const [state, dispatch] = useReducer(taskMatrixReducer, initialTaskMatrix(newTaskList))

  return (
    <div>
      <PageHeader
        title="Task Selector"
        description="Select which task is more important, a priority, needs to get done between, or whatever your criteria is."
      />


      <fieldset className="mt-8">
        <legend className="text-base font-semibold leading-6 text-gray-900">Select a task</legend>

        <TaskSelector />
      </fieldset>
    </div>
  )
}

export default TaskMatrix