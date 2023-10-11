import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as DotsHor } from '../assets/dots-horizontal.svg';

const Task = ({ task }) => {
    return(
        <Link to={`task/${task.id}/`} style={{color: '#fff', textDecoration: 'none'}}>
            <div className="task">
                <div className="task-top">
                    <div className={`${task.priority}-priority-tag`}>
                        <button>{`${task.priority} Priority`}</button>
                    </div>
                    <DotsHor />
                </div>

                <h1 className="taskname">{task.name}</h1>
                <p  className="date">{task.date}</p>
                <div className="progress-bar">
                    <span className="bar"><span className={task.priority} style={{width: `${task.progress}%`}}></span></span>
                </div>
                <p className="progress-percentage">{`${task.progress}% Completed`}</p>
            </div>
        </Link>
    )
}

export default Task;