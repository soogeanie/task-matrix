import type { TaskMatrixState } from '../types/TaskMatrixTypes';

import { CheckCircleIcon } from '@heroicons/react/24/solid';

type TaskSelectorProps = {
  tasks: TaskMatrixState['tasks'];
  handleOnChange: (selected: TaskMatrixState['selected']) => void;
}

const TaskPicker = ({ tasks, handleOnChange }: TaskSelectorProps) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-6">
      {tasks.map((task) => (
        <label key={task.id} className="relative flex cursor-pointer bg-white p-4 shadow-sm rounded-lg border border-gray-300 focus:outline-none has-[:checked]:border-violet-700 has-[:checked]:ring-2 has-[:checked]:ring-violet-700 has-[:focus]:ring-2 has-[:focus]:ring-violet-500">
          <input
            type="radio"
            name="task-selector"
            className="sr-only peer"
            id={task.id}
            value={task.value}
            aria-labelledby={task.id}
            onChange={() => handleOnChange(task.value)}
          />

          <span className="flex flex-1 min-w-64 text-lg font-semibold text-gray-900" id={task.id}>{task.text}</span>

          <CheckCircleIcon className="shrink-0 h-6 w-6 text-violet-700 hidden peer-checked:block" aria-hidden="true" />
        </label>
      ))}
    </div>
  )
}

export default TaskPicker
