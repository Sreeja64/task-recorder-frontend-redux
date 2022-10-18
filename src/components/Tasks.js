import Task from "./Task";

const Tasks = ({ tasks, toggleStatus, deleteTasks, subHeading }) => {
    return (
        <>
            <h3 style={{ textAlign: "center", marginBottom: "15px" }}>{subHeading}</h3>
            {tasks.length > 0 ? tasks.map((task, index) => (
                <Task key={index} task={task} toggleStatus={toggleStatus} deleteTasks={deleteTasks} />
            )) : <h4 style={{ textAlign: 'center' }}>No tasks found</h4>}

        </>
    )
}


export default Tasks
