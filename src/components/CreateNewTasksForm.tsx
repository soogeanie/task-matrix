import type { MinTask, NewTaskInput, CreateNewTasksState } from '../types/CreateNewTasksTypes';

import Button from './Button/Button';
import InputGroup from './InputGroup';
import InputText from './InputText';

import MinusCircleIcon from './Icons/MinusCircleIcon';

type CreateNewTasksFormProps = {
  tasks: CreateNewTasksState['tasks'];
  minTasks: MinTask;
  validForm: CreateNewTasksState['validForm'];
  onChangeTask: (updatedTask: NewTaskInput) => void;
  onDeleteTask: (task: NewTaskInput) => void;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CreateNewTasksForm = ({
  tasks,
  minTasks,
  validForm,
  onChangeTask,
  onDeleteTask,
  onFormSubmit
}: CreateNewTasksFormProps) => {

  const handleChange = (updatedTask: NewTaskInput) => {
    const existingTask = tasks.find((task: NewTaskInput) => task.id === updatedTask.id)

    if (!existingTask || (updatedTask.hasValue === existingTask.hasValue) && !updatedTask.hasError) return

    onChangeTask(updatedTask)
  }

  return (
    <form
      id="newTaskList"
      className="mt-4"
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
            handleOnClick={() => onDeleteTask(task)}
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