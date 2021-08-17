import React from 'react';
import { connect } from 'react-redux';
import './RecycleBinGroup.css';
import RecycleBinGroupItems from './RecycleBinGroupItems/RecycleBinGroupItems';

const RecycleBinGroup = ({ recycleBin }) => {

    const renderTasks = <RecycleBinGroupItems label="Задачи" items={recycleBin.tasks} type="tasks" />
    const renderLists = <RecycleBinGroupItems label="Списки" items={recycleBin.lists} type="lists" />
    const renderSubTasks = <RecycleBinGroupItems label="Подзадачи" items={recycleBin.subtasks} type="subtasks" />

    return (
        <div className="RecycleBinGroup">
            {renderLists}
            {renderTasks}
            {renderSubTasks}
        </div>
    )
}

const mapStateToProps = ({ recycleBin }) => {
    return {
        recycleBin
    }
}

export default connect(mapStateToProps)(RecycleBinGroup);