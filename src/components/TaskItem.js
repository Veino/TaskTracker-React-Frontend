import React from 'react';
import { ReactComponent as Cancel } from '../assets/x.svg';

const TaskItem = ({ task }) => {
    return(
        
        <div className="task-item">
            <form action="">
                <input type="checkbox" />
                <p>{task.name}</p>
            </form>
            <Cancel />
        </div>
    )
}

export default TaskItem;