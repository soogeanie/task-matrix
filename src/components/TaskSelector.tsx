import { useState } from 'react'
import CheckCircleIcon from './Icons/CheckCircleIcon'

const LABEL_STYLES = "inline-flex items-center justify-between w-full p-5 cursor-pointer bg-white border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none peer-checked:border-violet-700 peer-checked:ring-2 peer-checked:ring-violet-700"

const TaskSelector = () => {
  const [checked, setChecked] = useState('')

  return (
    <div className="mt-4 grid grid-cols-2 w-full gap-6">
      <div>
        <input
          type="radio"
          id="example-1"
          name="task-selector"
          value="example 1"
          className="hidden peer"
          required
        />

        <label
          htmlFor="example-1"
          className={LABEL_STYLES}>
            <span className="block w-full font-semibold text-lg text-gray-900">example 1</span>

            <CheckCircleIcon className="h-6 w-6 text-violet-700" />
        </label>
      </div>

      <div>
        <input
          type="radio"
          id="example-2"
          name="task-selector"
          value="example 2"
          className="hidden peer"
          required
        />

        <label
          htmlFor="example-2"
          className={LABEL_STYLES}>
            <span className="block w-full font-semibold text-lg text-gray-900">example 2</span>

            <CheckCircleIcon className="h-6 w-6 text-violet-700" />
        </label>
      </div>
    </div>
  )
}

export default TaskSelector