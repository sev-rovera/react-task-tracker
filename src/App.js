import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'

function App() {
  const name = 'Sev'
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1 // Because no back-end
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map(
      (task) => task.id === id ? { ...task, reminder: !task.reminder} : task))
  }

  return (
    <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}/>
        <h2> Hey { name }, let's make some plans! </h2>
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ?
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> :
          <h4>No task</h4>
        }
    </div>
  );
}

export default App;
