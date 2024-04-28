import { useReducer } from 'react';

import { ACTIONS, initialTaskMatrix, taskMatrixReducer } from '../reducers/TaskMatrixReducer';

import PageHeader from './PageHeader';
import TaskPicker from './TaskPicker';
import Button from './Button/Button';

type TaskMatrixProps = {
  newTaskList: string[];
}

const TaskMatrix = ({ newTaskList }: TaskMatrixProps) => {
  const [state, dispatch] = useReducer(taskMatrixReducer, initialTaskMatrix(newTaskList))

  const handleNextButton = () => {
    const input = document.querySelector('input[name="task-selector"]:checked') as HTMLInputElement

    dispatch({
      type: ACTIONS.ADD_SELECTED_TASK,
      selected: state.checked
    })

    input.checked = false
  }

  return (
    <div>
      <PageHeader
        title="Task Picker"
        description="Pick which task is more important, a priority, needs to get done between, or whatever your criteria is."
      />


      <fieldset className="mt-8 flex flex-col gap-4">
        <legend className="text-base font-semibold leading-6 text-gray-900">Pick a task</legend>

        <TaskPicker
          tasks={state.currentTasks}
          handleOnChange={(checkedValue: string) => dispatch({
            type: ACTIONS.UPDATE_CHECKED,
            checked: checkedValue
          })}
        />

        {!!state.checked.length &&
          <Button handleOnClick={() => handleNextButton()}>
            Next
          </Button>
        }
      </fieldset>
    </div>
  )
}

export default TaskMatrix