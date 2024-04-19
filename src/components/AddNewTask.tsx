import type { TaskInput } from './NewTaskList';
import PlusCircleIcon from './Icons/PlusCircleIcon';
import InputGroup from './InputGroup';
import InputText from './InputText'

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
          className="bg-gray-100 focus:ring-emerald-800"
          placeholder="Add A New Task"
          {...newTask}
        />

        <button type="submit" className="group">
          <PlusCircleIcon className="h-11 w-11 text-emerald-800 group-hover:text-emerald-700" />
          <span className="sr-only">Add New Task</span>
        </button>
      </InputGroup>
    </form>
  )
}

export default AddNewTask