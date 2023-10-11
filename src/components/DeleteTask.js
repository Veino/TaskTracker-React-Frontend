const DeleteTask = ({ showDeleteTaskOn, deleteTask }) => {
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h2>Attention</h2>
                    <p>Are you sure you want to delete this task?</p>
                    <div className="modal-options">
                        <button className="Del-Btn" onClick={() => {showDeleteTaskOn(); deleteTask();}}>Yes, Delete</button>
                        <button className="X-Btn" onClick={() => showDeleteTaskOn()}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteTask;