import { TaskInput } from './CreateTaskList'
import MinusCircleIcon from './Icons/MinusCircleIcon'
import InputGroup from './InputGroup'
import InputText from './InputText'

type NewTaskListProps = {
  tasks: TaskInput[];
  minTasks: number;
  handleDelete: (taskId: string) => void;
}

const NewTaskList = ({
  tasks,
  minTasks,
  handleDelete
}: NewTaskListProps) => {
  return (
    <form>
      {tasks.map((task: TaskInput) => (
        <InputGroup key={task.id}>
          <InputText
            placeholder='New Task'
            {...task}
          />

          <button
            type="button"
            className="group"
            disabled={tasks.length <= minTasks}
            onClick={() => handleDelete(task.id)}
          >
            <MinusCircleIcon
              className="h-11 w-11 text-red-700 group-disabled:text-gray-300"
            />
            <span className="sr-only">{`Delete ${task.label}`}</span>
          </button>
        </InputGroup>
      ))}
    </form>
  )
}

export default NewTaskList