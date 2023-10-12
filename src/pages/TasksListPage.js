import { useState, useEffect, } from "react";
import Task from '../components/Task.js'
import AddTaskBtn from "../components/AddTaskBtn.js"
import Header from "../components/Header.js";


const TasksListPage = () => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filterByPriority, setFilterByPriority] = useState('');

    useEffect(() => {
        getTasks()
    }, [])
    
    const getTasks = async () => {
        const res = await fetch('https://task-tracker-api-xxik.onrender.com//api/tasks/')
        const data = await res.json()
        setTasks(data)
    }

    const delAllTask = () => {
        fetch('https://task-tracker-api-xxik.onrender.com//api/tasks/', {
            method: 'DELETE'
        })
        setTasks([]);
    }
    
 
    const handleFilter = (priority) => {
        // Set the filterByPriority state
        setFilterByPriority(priority);

        // Filter tasks based on the selected priority
        const filtered = tasks.filter(task => task.priority === priority);
        setFilteredTasks(filtered);
    };

    const handleShowAll = () => {
        // Reset the filterByPriority state to show all tasks
        setFilterByPriority('');
        // Clear the filtered tasks array to show all tasks
        setFilteredTasks([]);
    };


    return(
        <div>
            
            <Header handleFilter={handleFilter} handleShowAll={handleShowAll} delAllTask={() => delAllTask()} />
            <AddTaskBtn />
            
            { 
                (tasks.length !== 0 ? 
                    (filteredTasks.length === 0 ? 

                    (
                        // Display all tasks if there are no filtered tasks
                        tasks.map((task) => (
                            <Task key={task.id} task={task} />
                        ))
                    ) : 

                    (
                        // Display filtered tasks if there are filtered tasks
                        filteredTasks.map(task => (
                            <Task key={task.id} task={task} />
                        ))
                    )): 
                
                <p>No Tasks to Show yet.</p>)
            }
            
        </div>
    )
}

export default TasksListPage;