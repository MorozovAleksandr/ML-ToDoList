import React, { useState } from 'react';
import './ToDoListItemSubTask.css';
import Button from '@material-ui/core/Button';
import ToDoListItemSubTaskItem from './ToDoListItemSubTaskItem/ToDoListItemSubTaskItem';
import AddToDoListItemSubTaskItem from './ToDoListItemSubTaskItem/AddToDoListItemSubTaskItem/AddToDoListItemSubTaskItem';
import { connect } from 'react-redux';

const ToDoListItemSubTask = ({ toDoListItem, lists, activeToDoListId }) => {

    const [showFormAddSubTask, setshowFormAddSubTask] = useState(false);

    const onCloseAddSubTaskForm = () => {
        setshowFormAddSubTask(false);
    }


    let renderSubTask;
    if (toDoListItem.subtask) {
        renderSubTask = toDoListItem.subtask.map(item => {
            return <ToDoListItemSubTaskItem key={item.id} taskId={toDoListItem.id} done={item.done} important={item.important} label={item.label} id={item.id} listId={activeToDoListId} />
        });
    } else {
        renderSubTask = null;
    }


    return (
        <div>
            <div className="ToDoListItemSubTask__renderSubTask">
                {renderSubTask}
            </div>
            <Button className="ToDoListItemSubTaskItem__button" onClick={() => { setshowFormAddSubTask(true) }} variant="contained" color="primary">
                Добавить подзадачу
            </Button>
            {
                showFormAddSubTask &&
                <AddToDoListItemSubTaskItem taskId={toDoListItem.id} cbOnCloseAddSubTaskForm={onCloseAddSubTaskForm} />
            }
        </div>
    );
};

const mapStateToProps = ({ lists, activeToDoListId }) => {
    return {
        lists,
        activeToDoListId
    }
}


export default connect(mapStateToProps)(ToDoListItemSubTask);