import { ReactComponent as Menu } from '../assets/menu.svg';
import { ReactComponent as Notification } from '../assets/notification.svg';
import { ReactComponent as Light } from '../assets/sun.svg';
import { ReactComponent as Dark } from '../assets/moon.svg';
import SideBar from './SideBar';
import { useState, useEffect } from 'react';
import FullWidthOptions from './FullWidthOptions';

const Header = ({ handleFilter, handleShowAll, delAllTask }) => {
    const [dark, setDark] = useState(
        localStorage.getItem('darkMode') === 'true' || false
    );
    const [showDel, setShowDel] = useState(false)

    dark ? (
        document.body.classList.add('dark')
    ) : (
        document.body.classList.remove('dark')
    );
    
    const [showSideBar, setShowSideBar] = useState(false);

    const showDelOn = () => {
        setShowDel(!showDel)
    }

    useEffect(() => {
    localStorage.setItem('darkMode', dark);
    }, [dark]);

    return(
        <>  

            {showDel && <FullWidthOptions showDelOn={showDelOn} delAllTask={delAllTask} /> }
            <header>
                <div className="left">
                    <Menu className='menu' onClick={() => setShowSideBar(!showSideBar)} />
                    <h1>Task Tracker</h1>
                </div>

                <div className="right">
                    <Notification />
                    {
                        dark ? (
                            <Light className='filter'  onClick={() => setDark(!dark)}  style={{cursor: 'pointer'}} />
                        ):(
                            <Dark className='filter'  onClick={() => setDark(!dark)}  style={{cursor: 'pointer'}} />
                        )
                    }
                </div>
            </header>
            { showSideBar && 
                <SideBar className="side-bar" forSide={() => setShowSideBar(!showSideBar)} 
                handleFilter={handleFilter} handleShowAll={handleShowAll} showDelOn={showDelOn} /> 
            }
        </>
    );
}

export default Header;