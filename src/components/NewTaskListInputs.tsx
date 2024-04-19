import { TaskInput } from './NewTaskList'
import MinusCircleIcon from './Icons/MinusCircleIcon'
import InputGroup from './InputGroup'
import InputText from './InputText'

type NewTaskListInputsProps = {
  tasks: TaskInput[];
  minTasks: number;
  handleDelete: (task: TaskInput) => void;
  handleInputUpdate: (updatedTask: TaskInput) => void;
}

const NewTaskListInputs = ({
  tasks,
  minTasks,
  handleDelete,
  handleInputUpdate
}: NewTaskListInputsProps) => {
  return (
    <>
      {tasks.map((task: TaskInput) => (
        <InputGroup key={task.id}>
          <InputText
            placeholder='New Task'
            required
            id={task.id}
            label={task.label}
            defaultValue={task.defaultValue}
            handleOnChange={(event) => handleInputUpdate({
              ...task,
              hasValue: !!event.currentTarget.value
            })}
          />

          <button
            type="button"
            className="group"
            disabled={tasks.length <= minTasks}
            onClick={() => handleDelete(task)}
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