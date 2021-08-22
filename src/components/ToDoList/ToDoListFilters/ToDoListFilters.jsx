import React from 'react';
import './ToDoListFilters.css';
import ToDoListFiltersChips from './ToDoListFiltersChips/ToDoListFiltersChips';
import ToDolistFiltersMenu from './ToDolistFiltersMenu/ToDolistFiltersMenu';

const ToDoListFilters = () => {
    return (
        <div className="ToDoListFilters">
            <ToDolistFiltersMenu />
            <ToDoListFiltersChips />
        </div>
    );
};

export default ToDoListFilters;