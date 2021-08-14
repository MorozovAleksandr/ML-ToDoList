import React, { useState } from 'react';
import './ToDoListItemSubTask.css';
import Button from '@material-ui/core/Button';
import ToDoListItemSubTaskItem from './ToDoListItemSubTaskItem/ToDoListItemSubTaskItem';
import crypto from "crypto";
import { connect } from 'react-redux';
import { addSubTask } from '../../../../redux/action/action-functions';
import withTodoListService from '../../../hoc/withTodoListService';
import EditForm from '../../../EditForm/EditForm';

const ToDoListItemSubTask = ({ toDoListItem, lists, activeToDoListId, addSubTask, user }) => {

    const [showFormAddSubTask, setshowFormAddSubTask] = useState(false);
    const [taskId] = useState(toDoListItem.id);
    const onCloseAddSubTaskForm = () => {
        setshowFormAddSubTask(false);
    }

    const createSubTask = (label) => {
        return {
            label: label,
            important: false,
            done: false,
            taskId: taskId,
            listId: activeToDoListId,
            date: null,
            time: null,
            id: crypto.randomBytes(3).toString("hex")
        }
    };

    const onSaveAddSubTaskForm = (label) => {
        const subTask = createSubTask(label)
        addSubTask(subTask, user, lists, activeToDoListId, taskId);
        onCloseAddSubTaskForm();
    }




    let renderSubTask;
    if (toDoListItem.subtask) {
        renderSubTask = toDoListItem.subtask.map(item => {
            return <ToDoListItemSubTaskItem key={item.id} date={item.date} time={item.time} taskId={toDoListItem.id} done={item.done} important={item.important} label={item.label} id={item.id} listId={activeToDoListId} />
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
                <EditForm initialLabel={''} title="Новая подзадача" text="Имя подзадачи" eventSave={onSaveAddSubTaskForm} eventClose={onCloseAddSubTaskForm} />
            }
        </div>
    );
};

const mapStateToProps = ({ lists, user, activeToDoListId }) => {
    return {
        lists,
        user,
        activeToDoListId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { todolistService } = ownProps;
    return {
        addSubTask: (subtask, user, lists, activeToDoListId, taskId) => {
            return addSubTask(todolistService, subtask, user, lists, activeToDoListId, taskId, dispatch)
        }
    }
}


export default withTodoListService()(connect(mapStateToProps, mapDispatchToProps)(ToDoListItemSubTask));