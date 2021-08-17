import React from 'react';
import './RecycleBinButton.css';
import { NavLink } from 'react-router-dom';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

const RecycleBinButton = () => {
    return (
        <NavLink className="RecycleBinButton" to="/recyclebin">
            <DeleteSweepIcon className="RecycleBinButton__icon" />
        </NavLink>

    );
};

export default RecycleBinButton;