import React from 'react';
import { connect } from 'react-redux';
import './ToDoListFiltersChips.css';
import ToDoListFiltersChipsItem from './ToDoListFiltersChipsItem/ToDoListFiltersChipsItem';

const ToDoListFiltersChips = ({ filters }) => {

    const filterChips = filters.filter(item => item.status);

    const renderChips = filterChips.map(item => <ToDoListFiltersChipsItem key={item.id} title={item.title} filter={item.filter} />);

    return (
        <div className="ToDoListFiltersChips">
            {renderChips}
        </div>
    );
};

const mapStateToProps = ({ filters }) => {
    return {
        filters
    }
}

export default connect(mapStateToProps)(ToDoListFiltersChips);