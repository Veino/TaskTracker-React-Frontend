import { useState } from 'react';
import { ReactComponent as Left } from '../assets/left.svg';
import { ReactComponent as Cancel } from '../assets/x.svg';
import { Link, useNavigate  } from "react-router-dom";
    
const AddTask = ({ addTask }) => {
    const [name, setName] = useState('')
    const [priority, setPriority] = useState('')
    const [date, setDate] = useState('')
	const [reminder, setReminder] = useState(false)
    const [newItem, setNewItem] = useState('')
    const [actionItems, setActionItems] = useState([])
    const navigate = useNavigate();

    //const TaskId = useParams().id;

    

    // useEffect(() => {
    //     const getTask = async () => {
    //         const res = await fetch(`/api/task/${TaskId}/`)
    //         const data = await res.json()
    //         setTask(data)
    //     }
    //     getTask()
    // }, [TaskId] )

    const handleInputChange = (e) => {
        setNewItem(e.target.value);
      }
    
      const handleAddItem = (e) => {
        e.preventDefault()
        if (newItem.trim() !== '') {
            // const newItemPin = {
            //     title: newItem,
            //     complete: false,
            // };
            setActionItems([...actionItems, newItem]);
          setNewItem(''); // Clear the input field
        }
      }

      const handleRemoveItem = (itemToRemove) => {
        const updatedItems = actionItems.filter(item => item !== itemToRemove);
        setActionItems(updatedItems);
      }

      const handleSubmit = async (e) => {
        e.preventDefault()

        if(!name) {
			alert('Please enter task')
			return
		} if (!date) {
            alert('Please enter date')
            return
        }

		const formData = {name, date, reminder, priority, actionItems:{actionItems}}

        const response = await fetch('/api/tasks/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

		setName('')
		setDate('')
        setPriority('')
        setActionItems('')
		setReminder(false)

        
        const data = await response.json()
        const newTaskId = data.id

        navigate(`/task/${newTaskId}`);

      }

    return (
        <div className="container task-form">    
        <Link to="/" >
            <Left />
        </Link>
        
        <h2>Add A New Task</h2>

        <form onSubmit={handleSubmit}>
            <div className="form-layout">
                <div className="form-control">
                    <label>Task Name</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </div>
                
                {/* <div className="form-control">
                    <label>Priority Name</label>
                    <input 
                        type="dropdown"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)} />
                </div> */}
                <div className="form-control">
                    <label>Priority Name</label>
                    <select 
                        placeholder='Select Priority'
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}>
                        <option style={{display:"none"}} />
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <div className="form-layout">
                <div className="form-control">
                    <label>Due Date</label>
                    <input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}/>
                </div>
                
                <div className="check">
                    {/* <span>Set reminder</span> */}
                    <input 
                        type="checkbox" 
                        value={reminder}
                        onChange={(e) => setReminder(e.currentTarget.checked)} />
                    <p className="reminder">Set Reminder</p>
                </div>
            </div>

            <div className="form-control last-form">
                <label>Task Action Item</label>
                <div className="action-item-form">
                    <input 
                        type="text" 
                        placeholder=""
                        value={newItem}
                        onChange={handleInputChange} />
                    <button onClick={handleAddItem}>Add Item</button>
                </div>           
            </div>

            <h3 className="action-items-heading">Task Action Items</h3>

            {actionItems.length > 0 ? ( 

                actionItems.map((item, index) => (
                    <div key={index} className="action-item-added">
                        <p>{item}</p>
                        <Cancel onClick={() => handleRemoveItem(item)} className='remove-actionItem' />
                    </div>
                ))

            ) : (
                "No action items to show yet."
            )}

            <input type="submit" value='Save' />

        </form>
    </div>
    )
}

export default AddTask;