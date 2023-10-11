const FullWidthOptions = ({ showDelOn, delAllTask }) => {
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h2>Attention</h2>
                    <p>Are you sure you want to delete all tasks?</p>
                    <div className="modal-options">
                        <button className="Del-Btn" onClick={() => {showDelOn(); delAllTask();}}>Yes, Delete</button>
                        <button className="X-Btn" onClick={() => showDelOn()}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FullWidthOptions;