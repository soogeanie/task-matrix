import { TaskInput } from './NewTaskList'
import MinusCircleIcon from './Icons/MinusCircleIcon'
import InputGroup from './InputGroup'
import InputText from './InputText'
import Button from './Button/Button'

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
  handleInputUpdate,
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

          <Button
            type="button"
            color="red"
            style="iconOnly"
            disabled={tasks.length <= minTasks}
            handleOnClick={() => handleDelete(task)}
          >
            <MinusCircleIcon className="h-11 w-11" />
            <span className="sr-only">{`Delete ${task.label}`}</span>
          </Button>
        </InputGroup>
      ))}
    </>
  )
}

export default NewTaskListInputs