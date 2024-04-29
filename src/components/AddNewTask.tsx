import type { NewTaskInput } from './CreateNewTasks';

import InputGroup from './InputGroup';
import InputText from './InputText';
import Button from './Button/Button';

import PlusCircleIcon from './Icons/PlusCircleIcon';

type AddNewTaskProps = {
  newTask: Omit<NewTaskInput, 'hasValue'>;
  onAddTask: (newTask: NewTaskInput) => void;
}

const AddNewTask = ({ newTask, onAddTask }: AddNewTaskProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const newTaskValue = formData.get(newTask.id) as string

    onAddTask({
      ...newTask,
      defaultValue: newTaskValue,
      hasValue: !!newTaskValue
    })

    event.currentTarget.reset()
  }

  return (
    <form id="addNewTask" onSubmit={handleSubmit}>
      <InputGroup>
        <InputText
          placeholder="Add a New Task"
          secondary
          {...newTask}
        />

        <Button
          type="submit"
          form="addNewTask"
          color="green"
          style="iconOnly"
          handleOnClick={() => handleSubmit}
        >
          <PlusCircleIcon className="h-11 w-11" aria-hidden="true" />
          <span className="sr-only">Add New Task</span>
        </Button>
      </InputGroup>
    </form>
  )
}

export default AddNewTask