import {FaTimes} from 'react-icons/fa';

const SideBar = ({ forSide, handleFilter, handleShowAll, showDelOn }) => {
    return (
        <div className='side-menu'>
            <FaTimes className='close-side-menu' onClick={forSide} />
            <ul className='side-menu-list'>
                <span><li className='showside'>Show Tasks</li></span>
                <ul className='show-tasks'>
                    <li onClick={() => {forSide(); handleShowAll()}}>All</li>
                    <li onClick={() => {forSide(); handleFilter('low')}}>Low Priority</li>
                    <li onClick={() => {forSide(); handleFilter('medium')}}>Medium Priority</li>
                    <li onClick={() => {forSide(); handleFilter('high')}}>High Priority</li>
                </ul>
                <li onClick={() => {showDelOn(); forSide();}} >Delete All Tasks</li>
                <li>About Task Tracker</li>
            </ul>
        </div>
    );
}

export default SideBar;