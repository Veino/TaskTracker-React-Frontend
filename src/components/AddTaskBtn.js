import { Link } from "react-router-dom"; 

const AddTaskBtn = () => {
    return (
        
        <div className="main">
            <div className="add-task">
                <Link to='/create/'   style={{color: '#fff', textDecoration: 'none'}}> 
                    <button className="btn">Add a New Task</button>
                </Link>
            </div>
    
            <h3 className="tasks-title">All Tasks</h3>
        </div>
      
    )
}

export default AddTaskBtn;