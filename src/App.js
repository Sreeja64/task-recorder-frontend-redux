import { useEffect, useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { addTasks, fetchTasks, deleteTasks, toggleStatus, fetchActiveTasks } from './redux/taskSlice';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {

  const [btnContent, setBtnContent] = useState('Completed Tasks')
  const [subHeading, setSubheading] = useState('All Tasks')
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

  const addTask = (task)=>{
    try{
      dispatch(addTasks({name:task.name,status:task.status}))
    }
    catch(e){
      console.log(e);
    }
  };

  const toggleStat = (id) => {
    try {
      dispatch(toggleStatus(id))
    }
    catch (e) {
      console.log(e);
    }
  }

  const showActiveTasks = async () => {
    try {
      dispatch(fetchActiveTasks())
      setBtnContent('All Tasks')
      setSubheading('Completed Tasks')
    }
    catch (e) {
      console.log(e);
    }
  }

  const showAllTasks = async () => {
    try{
      dispatch(fetchTasks());
      setBtnContent('Completed Tasks')
      setSubheading('All Tasks')
    }
   catch(e){
    console.log(e);
   }
  }

  const deleteTask = async (id) => {
    try {
      dispatch(deleteTasks(id))
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

  return (

    <div className="container">
      <Header onclick={showAddTask} showTasks={btnContent === 'Completed Tasks' ? showActiveTasks : showAllTasks} btnContent={btnContent} addFormBtnContent={showAddTaskForm}/>
        {showAddTaskForm ? <AddTask onAdd={addTask} /> : <p></p>}
        <Tasks subHeading={subHeading} tasks={tasks} toggleStatus={toggleStat} deleteTasks={deleteTask} />
    </div>

  );
}

export default App;
