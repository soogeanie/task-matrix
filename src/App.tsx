// import { useEffect } from 'react'
import NewTaskList from './pages/NewTaskList'

const App = () => {
  // tbd: build a modal for this
  // useEffect(() => {
  //   window.onbeforeunload = () => {
  //     // pop up modal for do you want to ditch all your hard work?
  //   }

  //   return () => {
  //     window.onbeforeunload = null
  //   }
  // })

  return (
    <div className="min-h-full">
      <NewTaskList />
    </div>
  )
}

export default App
