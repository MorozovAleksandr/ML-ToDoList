import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { toggleFilterAC } from '../../../../../redux/action/action'
import './ToDolistFiltersMenuItem.css';
import { connect } from 'react-redux';

const ToDolistFiltersMenuItem = ({ title, status, filter, toggleFilterAC }) => {

    const [check, setCheck] = useState(status);

    useEffect(() => {
        setCheck(status);
    }, [status]);

    const handleChecked = (e) => {
        e.preventDefault();
        toggleFilterAC(filter);
    }

    return (
        <MenuItem onClick={handleChecked}>
            <Checkbox checked={check} className="ToDolistFiltersMenu__checkbox" />
            <ListItemText primary={title} />
        </MenuItem>
    );
};

const mapDispatchToProps = {
    toggleFilterAC
}

export default connect(null, mapDispatchToProps)(ToDolistFiltersMenuItem);