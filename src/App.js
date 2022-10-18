import { useEffect, useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

const App = () => {
  //{name:"Dancing",staus:"true"},{name:"Coding",status:"false"}
  const [tasks, setTasks] = useState([])
  const [btnContent, setBtnContent] = useState('Completed Tasks')
  const [subHeading, setSubheading] = useState('All Tasks')
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)
  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks()
      setTasks(tasks)
      //await showAllTasks()
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:3030/fetchAllTasks', { method: 'GET' })
      const data = await res.json()
      //console.log(data);
      return data
    }
    catch (e) {
      console.log(e);
    }
  }

  const toggleStatus = async (id) => {
    try {
      await fetch(`http://localhost:3030/toggleStatus/${id}`, { method: 'PUT' })
      const tasks = await fetchTasks()
      setTasks(tasks)
    }
    catch (e) {
      console.log(e);
    }
  }

  const showActiveTasks = async () => {
    try {
      const res = await fetch('http://localhost:3030/fetchActiveTasks', { method: 'GET' })
      const data = await res.json()
      setTasks(data)
      setBtnContent('All Tasks')
      setSubheading('Completed Tasks')
    }
    catch (e) {
      console.log(e);
    }
  }

  const showAllTasks = async () => {
    const tasks = await fetchTasks()
    setTasks(tasks)
    setBtnContent('Completed Tasks')
    setSubheading('All Tasks')
  }

  const deleteTasks = async (id) => {
    try {
      await fetch(`http://localhost:3030/deleteTask/${id}`, { method: 'DELETE' })
      if (subHeading === 'All Tasks') {
        await showAllTasks();
      }
      else {
        await showActiveTasks();
      }

    }
    catch (e) {
      console.log(e);
    }
  }

  const showAddTask = async () => {
    setShowAddTaskForm(!showAddTaskForm)
  }

  const addTask = async (task) => {
    try {
      await fetch('http://localhost:3030/addTask', {
        method: 'POST', headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      await showAllTasks();
    }
    catch (e) {
      console.log(e);
    }

  }

  return (
    <div className="container">
      <Header onclick={showAddTask} showTasks={btnContent === 'Completed Tasks' ? showActiveTasks : showAllTasks} btnContent={btnContent} addFormBtnContent={showAddTaskForm}/>
      {showAddTaskForm ? <AddTask onAdd={addTask} /> : <p></p>}
      <Tasks subHeading={subHeading} tasks={tasks} toggleStatus={toggleStatus} deleteTasks={deleteTasks} />
    </div>
  );
}

export default App;
