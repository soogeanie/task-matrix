import type { TaskInput } from './NewTaskList';
import PlusCircleIcon from './Icons/PlusCircleIcon';
import InputGroup from './InputGroup';
import InputText from './InputText'
import Button from './Button/Button';

type AddNewTaskProps = {
  nextInput: string;
  handleNewTask: (newTask: TaskInput) => void;
}

const AddNewTask = ({ nextInput, handleNewTask }: AddNewTaskProps) => {
  const newTask = {
    id: `task-input-${nextInput}`,
    label: `Task Input ${nextInput}`,
    defaultValue: ''
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const newTaskValue = formData.get(newTask.id) as string | null

    handleNewTask({
      ...newTask,
      defaultValue: newTaskValue || '',
      hasValue: !!newTaskValue
    })

    event.currentTarget.reset()
  }

  return (
    <form id="addNewTask" onSubmit={handleSubmit}>
      <InputGroup>
        <InputText
          placeholder="Add A New Task"
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
          <PlusCircleIcon className="h-11 w-11" />
          <span className="sr-only">Add New Task</span>
        </Button>
      </InputGroup>
    </form>
  )
}

export default AddNewTask