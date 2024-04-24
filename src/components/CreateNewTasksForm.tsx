import type { NewTaskInput } from './CreateNewTasks'

import Button from './Button/Button';
import InputGroup from './InputGroup';
import InputText from './InputText';

import MinusCircleIcon from './Icons/MinusCircleIcon';

type CreateNewTasksFormProps = {
  tasks: NewTaskInput[];
  minTasks: number;
  validForm: boolean;
  onInputUpdate: (updatedTask: NewTaskInput) => void;
  onInputDelete: (task: NewTaskInput) => void;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CreateNewTasksForm = ({
  tasks,
  minTasks,
  validForm,
  onInputUpdate,
  onInputDelete,
  onFormSubmit
}: CreateNewTasksFormProps) => {

  const handleChange = (updatedTask: NewTaskInput) => {
    const existingTask = tasks.find((task: NewTaskInput) => task.id === updatedTask.id)

    if (!existingTask || (updatedTask.hasValue === existingTask.hasValue) && !updatedTask.hasError) return

    onInputUpdate(updatedTask)
  }

  return (
    <form
      id="newTaskList"
      noValidate
      onSubmit={onFormSubmit}
    >
      {tasks.map((task: NewTaskInput) => (
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

export default CreateNewTasksForm