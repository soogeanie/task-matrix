import { TaskInput } from './CreateTaskList';
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
      defaultValue: newTaskValue || ''
    })

    event.currentTarget.reset()
  }

  return (
    <form id="addNewTask" onSubmit={handleSubmit}>
      <InputText
        {...newTask}
        placeholder="Add Another Task"
      />

      <button type="submit">Add</button>
    </form>
  )
}

export default AddNewTask