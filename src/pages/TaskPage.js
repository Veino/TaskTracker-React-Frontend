import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ReactComponent as Left } from '../assets/left.svg';
import { ReactComponent as Cancel } from '../assets/x.svg';
import { ReactComponent as DotsVert } from '../assets/dots-vertical.svg';
import ChangePriority from '../components/ChangePriority';
import DeleteTask from '../components/DeleteTask';


const TaskPage = ({ match }) => {
    const TaskId = useParams().id;
    const [task, setTask] = useState(null);
    const [showTaskOptions, setShowTaskOptions] = useState(false)
    const [showChangePriority, setShowChangePriority] = useState(false)
    const [showDeleteTask, setShowDeleteTask] = useState(false)
    const [selectedPriority, setSelectedPriority] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getTask = async () => {
            const res = await fetch(`/api/tasks/${TaskId}/`)
            const data = await res.json()
            setTask(data)
            //setActionItems(data.actionItems)
            // const actionItems = data.actionItems
            // const completeStatuses = actionItems.map((item) => item.complete);
            // setactionItemsCompletions(completeStatuses)
            // console.log(completeStatuses)
        }
        getTask()
    }, [TaskId] )
    

    const deleteActionitem = (itemId) => {
        fetch(`/api/tasks/${TaskId}/actionitems/${itemId}`, {
            method: 'DELETE'
        })
        const updatedTaskData = { ...task };

        updatedTaskData.actionItems = updatedTaskData.actionItems.filter(
            (item) => item.id !== itemId
        );

        // setTask(updatedTaskData);
        updateProgress(updatedTaskData);
    }

    const deleteTask = () => {
        fetch(`/api/tasks/${TaskId}/`, {
            method: 'DELETE'
        })
        navigate('/');
    }

    const handlePriorityChange = (priority) => {
        setSelectedPriority(priority)
    
        fetch(`/api/tasks/${TaskId}/`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({priority})
        })

        const updatedTaskData = { ...task }
        updatedTaskData.priority = priority
        setTask(updatedTaskData);
    }

    const updateProgress = (updatedTaskData) => {
        const totalItems = updatedTaskData.actionItems.length;
        const completedItems = updatedTaskData.actionItems.filter(
            (item) => item.complete
        ).length;

        const newProgress = updatedTaskData.progress =
            Math.trunc(totalItems > 0 ? (completedItems / totalItems) * 100 : 0);

        setTask(updatedTaskData);
        return newProgress;
    }


    const updateCompletion = async (itemId, isChecked) => {

        const updatedTaskData = { ...task };
        const actionItemToUpdate = updatedTaskData.actionItems.find(
            (item) => item.id === itemId
        );

        if (actionItemToUpdate) {
            actionItemToUpdate.complete = isChecked;
        }

        // const totalItems = updatedTaskData.actionItems.length;
        // const completedItems = updatedTaskData.actionItems.filter(
        //     (item) => item.complete
        // ).length;

        // const newProgress = updatedTaskData.progress =
        //     Math.trunc(totalItems > 0 ? (completedItems / totalItems) * 100 : 0);

        // setTask(updatedTaskData);

        const newProgress = updateProgress(updatedTaskData)
        


        await fetch(`/api/tasks/${TaskId}/actionitems/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({complete: isChecked, progress: newProgress}),
        })
    }

    const showChangePriorityOn = () => {
        setShowChangePriority(!showChangePriority)
    }

    const showTaskOptionsOn = () => {
        setShowTaskOptions(!showTaskOptions)
    }

    const showDeleteTaskOn = () => {
        setShowDeleteTask(!showDeleteTask)
    }

    return(
        <>
            {showChangePriority && <ChangePriority  
            showChangePriorityOn={() => showChangePriorityOn()} 
            handlePriorityChange={handlePriorityChange}/>}

            {showDeleteTask && <DeleteTask  showDeleteTaskOn={() => showDeleteTaskOn()} deleteTask={() => deleteTask()} />}
            <div className="container single-task">
                <div className="single-task-top">
                    <Link to='/' >
                        <Left  />
                    </Link>
                    
                    <p>Task Details</p>

                    <DotsVert className='show-task-options' onClick={() => showTaskOptionsOn()} />
                    
                </div>
                {
                    showTaskOptions && 
                        <div className='priority-tab' style={{marginBottom: '-5px'}}>
                            <ul className='priority-options'>
                                <li onClick={() => {showChangePriorityOn(); showTaskOptionsOn(); }}>Change Priority</li>
                                <li onClick={() => {showDeleteTaskOn(); showTaskOptionsOn(); }}>Delete Task</li>
                            </ul>
                        </div>   
                }

                <div className={`${task?.priority}-priority-tag`}>
                    <button>{`${task?.priority} Priority`}</button>
                </div>

                <div className="task-details">
                    <h1 className="taskname">{task?.name}</h1>
                    <p  className="date">07/12/2015</p>
                    <div className="progress-bar">
                        <span className="bar"><span className={task?.priority} style={{width: `${task?.progress}%`}}></span></span>
                    </div>
                    <p className="progress-percentage">{task?.progress}% Completed</p>
                </div>
                
                {task?.actionItems.map((actionItem, index) => {
                    return (
                        <div key={index} className="task-item">
                            <form action="">
                                <input 
                                type="checkbox"
                                value={actionItem.complete}
                                checked={actionItem.complete}
                                onChange={(e) => updateCompletion(actionItem.id, e.currentTarget.checked )} />
                                <p>{actionItem.title}</p>
                            </form>
                            <Cancel onClick={() => deleteActionitem(actionItem.id)} />
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default TaskPage;