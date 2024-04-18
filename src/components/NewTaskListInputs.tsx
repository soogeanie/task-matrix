import { TaskInput } from './NewTaskList'
import MinusCircleIcon from './Icons/MinusCircleIcon'
import InputGroup from './InputGroup'
import InputText from './InputText'

type NewTaskListInputsProps = {
  tasks: TaskInput[];
  minTasks: number;
  handleDelete: (taskId: string) => void;
}

const NewTaskListInputs = ({
  tasks,
  minTasks,
  handleDelete,
}: NewTaskListInputsProps) => {
  return (
    <>
      {tasks.map((task: TaskInput) => (
        <InputGroup key={task.id}>
          <InputText
            placeholder='New Task'
            required
            {...task}
          />

          <button
            type="button"
            className="group"
            disabled={tasks.length <= minTasks}
            onClick={() => handleDelete(task.id)}
          >
            <MinusCircleIcon
              className="h-11 w-11 text-red-700 group-hover:text-red-600 group-disabled:text-gray-300"
            />
            <span className="sr-only">{`Delete ${task.label}`}</span>
          </button>
        </InputGroup>
      ))}
    </>
  )
}

export default NewTaskListInputs