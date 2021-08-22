import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './ToDolistFiltersMenu.css';
import ToDolistFiltersMenuItem from './ToDolistFiltersMenuItem/ToDolistFiltersMenuItem';
import { connect } from 'react-redux';

const ToDolistFiltersMenu = ({ filters }) => {

    const [openMenu, setOpenMenu] = useState(false);

    const handleClick = () => {
        setOpenMenu(!openMenu);
    };

    const handleClose = () => {
        setOpenMenu(false);
    }

    const renderElements = filters.map(item => <ToDolistFiltersMenuItem key={item.id} title={item.title} status={item.status} filter={item.filter} />);

    return (
        <div className="ToDolistFiltersMenu">
            <div onClick={handleClose} className={`closeMenu ${openMenu ? `closeMenu_show` : ''}`}></div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                className="ToDolistFiltersMenu_button"
                onClick={handleClick}
            >

                <img className="ToDolistFiltersMenu_icon" src="images/filter.svg" alt="filter"></img>
                <span>
                    Фильтры
                </span>
            </Button>
            <div className={`ToDolistFiltersMenuItems ${openMenu ? `ToDolistFiltersMenuItems_show` : ''}  `}>
                {renderElements}
            </div>
        </div>
    );
};

const mapStateToProps = ({ filters }) => {
    return {
        filters
    }
}

export default connect(mapStateToProps)(ToDolistFiltersMenu);