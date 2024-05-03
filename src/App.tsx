// import { useEffect } from 'react'
import NewTaskList from './pages/NewTaskList';

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
      <div className="py-10">
        <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12 lg:pb-16">
          <NewTaskList />
        </main>
      </div>
    </div>
  )
}

export default App
