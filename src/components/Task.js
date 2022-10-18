import {FaTimes} from 'react-icons/fa';
const Task = ({ task,toggleStatus,deleteTasks }) => {
    return (
        <div className={`task ${task.status ? 'reminder':''}`} onDoubleClick={()=> toggleStatus(task._id)}>
            <h3> {task.name} <FaTimes style={{ color: 'red' }} onClick={()=> deleteTasks(task._id)}/></h3>
            <p> {task.status ? 'Completed' : 'Pending'} </p>
        </div>
    )
}

export default Task
