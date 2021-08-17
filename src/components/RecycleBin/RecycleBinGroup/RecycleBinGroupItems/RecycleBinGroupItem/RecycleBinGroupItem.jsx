import React from 'react';
import { connect } from 'react-redux';
import './RecycleBinGroupItem.css';
import RecycleBinGroupItemAction from './RecycleBinGroupItemAction/RecycleBinGroupItemAction';
import RecycleBinGroupItemLabel from './RecycleBinGroupItemLabel/RecycleBinGroupItemLabel';
import RecycleBinGroupItemPath from './RecycleBinGroupItemPath/RecycleBinGroupItemPath';
import { updateItemInRecycleBinAC } from '../../../../../redux/action/action';

const RecycleBinGroupItem = ({ item, type, lists, updateItemInRecycleBinAC }) => {

    let path = {
        list: null,
        task: null,
        subtask: null
    };

    if (type === "lists") {
        path = { ...path, list: item.label };
    }

    if (type === "tasks") {
        const list = lists.find(list => list.id === item.listId);
        if (list === undefined) {
            updateItemInRecycleBinAC(item, type);
        } else {
            path = { ...path, list: list.label, task: item.label };
        }
    }

    if (type === "subtasks") {
        const list = lists.find(list => list.id === item.listId);
        const task = list.toDoList.find(task => task.id === item.taskId);
        path = { list: list.label, task: task.label, subtask: item.label };
    }

    return (
        <div className="RecycleBinGroupItem">
            <RecycleBinGroupItemLabel label={item.label} />
            <RecycleBinGroupItemPath path={path} />
            <RecycleBinGroupItemAction item={item} type={type} />
        </div>
    );
};

const mapStateToProps = ({ lists }) => {
    return {
        lists
    }
}

const mapDispatchToProps = {
    updateItemInRecycleBinAC
}

export default connect(mapStateToProps, mapDispatchToProps)(RecycleBinGroupItem);