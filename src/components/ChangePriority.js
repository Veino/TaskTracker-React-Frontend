const ChangePriority = ({ showChangePriorityOn, handlePriorityChange }) => {
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <span className="close" id="closeModalBtn" onClick={showChangePriorityOn} >&times;</span>
                    <h2>Change Task Priority</h2>
                    <p>Choose Task Priority</p>
                    <div className="modal-options">
                        <button 
                            className="change-priority-low" 
                            value="low" 
                            onClick={() => {handlePriorityChange('low'); showChangePriorityOn();}}>Low
                        </button>
                        <button 
                            className="change-priority-medium" 
                            value="medium"
                            onClick={() => {handlePriorityChange('medium'); showChangePriorityOn();}}>Medium
                        </button>
                        <button 
                            className="change-priority-high" 
                            value="high"
                            onClick={() => {handlePriorityChange('high'); showChangePriorityOn();}}>High
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePriority;