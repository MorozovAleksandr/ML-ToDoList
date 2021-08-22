import React from 'react';
import './ToDoListFiltersChipsItem.css';
import { offFilterAC } from '../../../../../redux/action/action';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';

const ToDoListFiltersChipsItem = ({ title, filter, offFilterAC }) => {

    const handleDelete = () => {
        offFilterAC(filter);
    }

    return (
        <Chip className="ToDoListFiltersChipsItem" label={title} onDelete={handleDelete} deleteIcon={<CloseIcon />} color="primary" />
    );
};

const mapDispatchToProps = {
    offFilterAC
}

export default connect(null, mapDispatchToProps)(ToDoListFiltersChipsItem);