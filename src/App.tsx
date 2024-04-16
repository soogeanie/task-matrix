import CreateTaskList from './components/CreateTaskList'

const App = () => {
  return (
    <div className="min-h-full">
      <main className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <CreateTaskList />
        </div>
      </main>
    </div>
  )
}

export default App
