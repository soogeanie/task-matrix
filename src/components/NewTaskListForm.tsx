import Button from './Button/Button';
import MinusCircleIcon from './Icons/MinusCircleIcon';
import InputGroup from './InputGroup';
import InputText from './InputText';
import type { TaskInput } from './NewTaskList'

type NewTaskListFormProps = {
  tasks: TaskInput[];
  minTasks: number;
  validForm: boolean;
  onInputUpdate: (updatedTask: TaskInput) => void;
  onInputDelete: (task: TaskInput) => void;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const NewTaskListForm = ({
  tasks,
  minTasks,
  validForm,
  onInputUpdate,
  onInputDelete,
  onFormSubmit
}: NewTaskListFormProps) => {

  const handleChange = (updatedTask: TaskInput) => {
    const existingTask = tasks.find((task: TaskInput) => task.id === updatedTask.id)

    if (!existingTask || (updatedTask.hasValue === existingTask.hasValue) && !updatedTask.hasError) return

    onInputUpdate(updatedTask)
  }

  return (
    <form
      id="newTaskList"
      noValidate
      onSubmit={onFormSubmit}
    >
      {tasks.map((task: TaskInput) => (
        <InputGroup key={`newTask-${task.id}`}>
          <InputText
            required
            placeholder="New Task"
            maxLength={256}
            minLength={3}
            validForm={validForm}
            {...task}
            onHandleChange={(event) => handleChange({
              ...task,
              hasValue: !!event.currentTarget.value.length
            })}
          />

          <Button
            type="button"
            color="red"
            style="iconOnly"
            disabled={tasks.length <= minTasks}
            handleOnClick={() => onInputDelete(task)}
          >
            <MinusCircleIcon className="h-11 w-11" aria-hidden="true" />
            <span className="sr-only">{`Delete ${task.label}`}</span>
          </Button>
        </InputGroup>
      ))}
    </form>
  )
}

export default NewTaskListForm